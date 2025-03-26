"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDocumentByDate = exports.storeDocument = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const documentModel_1 = __importDefault(require("../models/documentModel"));
const storeDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date;
        if (req.body.date)
            date = req.body.date;
        if (req.query.date)
            date = req.query.date;
        const file = req.file;
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        console.log("User:", res.locals.user);
        if (!date) {
            res.status(400).json({ message: "Date or userId is not defined" });
            return;
        }
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const user = res.locals.user;
        if (!user) {
            res.status(401).json({ message: "User not LoggedIN" });
            return;
        }
        const userId = user._id;
        const fileId = crypto_1.default.randomBytes(16).toString("hex");
        const salt = crypto_1.default.randomBytes(8).toString("hex");
        const encryptedFileId = crypto_1.default
            .createHash("sha256")
            .update(fileId + salt)
            .digest("hex");
        const uploadDir = path_1.default.join(__dirname, "../../uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path_1.default.join(uploadDir, `${fileId}${path_1.default.extname(file.originalname)}`);
        try {
            fs_1.default.writeFileSync(filePath, file.buffer);
        }
        catch (fileError) {
            console.error("File write error:", fileError);
            res.status(500).json({ message: "Error saving file" });
            return;
        }
        const document = new documentModel_1.default({
            fileId,
            encryptedFileId,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            uploadedAt: new Date(date),
            userId,
        });
        yield document.save();
        res
            .status(201)
            .json({ message: "File stored successfully", fileId, encryptedFileId });
        return;
    }
    catch (error) {
        console.error("Error storing file:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.storeDocument = storeDocument;
const fetchDocumentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.body;
        if (!date) {
            res.status(400).json({ message: "Date not provided" });
            return;
        }
        const user = res.locals.user;
        if (!user) {
            res.status(401).json({ message: "User not LoggedIN" });
            return;
        }
        const searchDate = new Date(date);
        const documents = yield documentModel_1.default.find({
            uploadedAt: {
                $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
                $lt: new Date(searchDate.setHours(23, 59, 59, 999)),
            },
        });
        res.status(200).json({ documents });
        return;
    }
    catch (err) {
        console.error("Error fetching file: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.fetchDocumentByDate = fetchDocumentByDate;
//# sourceMappingURL=documentController.js.map