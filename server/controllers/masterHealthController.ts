import { Request, Response } from "express";
import MasterHealthModel from "../models/masterHealthModel";

import multer from "multer";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import fs from "fs";

export const createMasterHealth = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const { tests } = req.body;

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!tests || !Array.isArray(tests)) {
      return res.status(400).json({ message: "Invalid or missing tests data" });
    }

    const userId = user._id;
    let labReport = await MasterHealthModel.findOne({ userId });

    if (!labReport) {
      labReport = new MasterHealthModel({
        userId,
        tests,
      });
      await labReport.save();
      return res
        .status(200)
        .json({ message: "New lab report created", report: labReport });
    }

    tests.forEach((newTest: any) => {
      const existingTest = labReport.tests.find(
        (test: any) => test.categories === newTest.categories
      );

      if (existingTest) {
        Object.entries(newTest.parameters).forEach(([key, value]) => {
          existingTest.parameters.set(key, value as number);
        });
      } else {
        labReport.tests.push(newTest);
      }
    });

    await labReport.save();
    return res
      .status(200)
      .json({ message: "Lab report updated", report: labReport });
  } catch (error) {
    console.error("Error updating lab report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMasterHealth = async (req: Request, res: Response) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userId = user._id;
  const allMasterHealth = await MasterHealthModel.find({ userId });

  if (!allMasterHealth) {
    res.status(200).json({ message: "There is no Master Health is not Found" });
    return;
  }
  res
    .status(200)
    .json({ message: "Master Health data is Found", data: allMasterHealth });
};

interface FileProcessingService extends grpc.Client {
  processFile: (
    request: { file: Buffer; type: string },
    callback: (error: grpc.ServiceError | null, response: FileResponse) => void
  ) => void;
}

interface FileResponse {
  status: string;
  message: string;
  tests: Test[];
}

interface Test {
  categories: string;
  parameters: { [key: string]: number };
}

// Load proto file
const packageDefinition = protoLoader.loadSync('proto/health.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

interface IFileProcessingServiceClient extends grpc.Client {
  processFile: (
    request: { file: Buffer; type: string },
    callback: (error: grpc.ServiceError | null, response: FileResponse) => void
  ) => void;
}

const healthProto = grpc.loadPackageDefinition(packageDefinition);
const client = new (healthProto.health as any).FileProcessingService(
  process.env.GRPC_SERVER || 'localhost:50051',
  grpc.credentials.createInsecure()
) as IFileProcessingServiceClient;;

// Configure multer with better error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '');
    cb(null, `${file.fieldname}-${uniqueSuffix}-${sanitizedName}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF documents are allowed'));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

export const uploadFile = upload.single('file');

export const newMasterHealthPhoto = [
  uploadFile,
  async (req: Request, res: Response) => {
    try {
      // Validate user
      const user = res.locals.user;
      if (!user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      // Validate file
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const { path: filePath, mimetype } = req.file;
      
      // Read and validate file
      let fileBuffer: Buffer;
      try {
        fileBuffer = fs.readFileSync(filePath);
      } catch (error) {
        console.error('File read error:', error);
        return res.status(500).json({ message: 'Failed to read uploaded file' });
      }

      // Determine file type
      const fileType = mimetype.startsWith('image/') ? 'image' : 'pdf';

      // Process with gRPC service
      const response = await new Promise<FileResponse>((resolve, reject) => {
        client.processFile(
          { file: fileBuffer, type: fileType },
          (error, response) => {
            if (error) {
              console.error('gRPC service error:', error);
              return reject(error);
            }
            resolve(response);
          }
        );
      });

      // Cleanup uploaded file
      fs.unlink(filePath, (err) => {
        if (err) console.error('File cleanup error:', err);
      });

      // Validate gRPC response
      if (response.status !== 'Success') {
        return res.status(400).json({ 
          message: response.message || 'File processing failed',
          details: response
        });
      }

      // Success response
      return res.status(200).json({
        message: 'File processed successfully',
        data: response.tests,
        metadata: {
          processedAt: new Date().toISOString(),
          fileType,
          fileSize: fileBuffer.length
        }
      });

    } catch (error) {
      console.error('Processing error:', error);
      
      // Cleanup if file was uploaded
      if (req.file?.path) {
        fs.unlink(req.file.path, () => {});
      }

      const status = error.code === grpc.status.INVALID_ARGUMENT ? 400 : 500;
      return res.status(status).json({ 
        message: error.message || 'Internal server error',
        details: error.details || null
      });
    }
  }
];