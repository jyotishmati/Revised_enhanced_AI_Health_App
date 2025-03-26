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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../../app"));
const documentModel_1 = __importDefault(require("../../models/documentModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app_1.default.use(express_1.default.json());
app_1.default.use(express_1.default.urlencoded({ extended: true }));
app_1.default.use((0, cookie_parser_1.default)());
let mongoServer;
let authToken;
let server;
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongoose_1.default.connect(mongoServer.getUri());
    server = app_1.default.listen(6010);
    const user = new userModel_1.default({
        userName: "Test User",
        email: "testuser@example.com",
        password: "password123",
        emailVerified: true,
    });
    yield user.save();
    userId = user._id;
    authToken = (0, authController_1.signToken)(user._id.toString());
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Document Controller Tests", () => {
    // it("should store a document successfully", async () => {
    //   const filePath = path.join(__dirname, "testFile.txt");
    //   fs.writeFileSync(filePath, "Test content");
    //   const res = await request(app)
    //     .post("/v1/docs/save-docs?date=2025-03-02T12:00:00Z")
    //     .set("Authorization", `Bearer ${authToken}`)
    //     .attach("file", filePath);
    //   expect(["No file uploaded", "File stored successfully"]).toContain(
    //     res.body.message
    //   );
    //   expect(res.status).toBe(201);
    //   expect(res.body).toHaveProperty("fileId");
    //   expect(res.body).toHaveProperty("encryptedFileId");
    //   fs.unlinkSync(filePath);
    // });
    it("should return error if no file is uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/save-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ date: new Date().toISOString() });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("No file uploaded");
    }));
    it("should return error if date is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testFile.txt");
        fs_1.default.writeFileSync(filePath, "Test content");
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/save-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .attach("file", filePath);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Date or userId is not defined");
        fs_1.default.unlinkSync(filePath);
    }));
    it("should return error if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testFile.txt");
        fs_1.default.writeFileSync(filePath, "Test content");
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/save-docs?date=2025-03-02T12:00:00Z")
            .attach("file", filePath);
        // .field("date", new Date().toISOString());
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized access");
        fs_1.default.unlinkSync(filePath);
    }));
    it("should fetch documents by date", () => __awaiter(void 0, void 0, void 0, function* () {
        const testDate = new Date().toISOString();
        yield new documentModel_1.default({
            fileId: "test123",
            encryptedFileId: "encryptedTest123",
            fileName: "testFile.txt",
            fileType: "text/plain",
            fileSize: 1024,
            uploadedAt: new Date(testDate),
            userId,
        }).save();
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/get-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ date: testDate });
        expect(res.status).toBe(200);
        expect(res.body.documents.length).toBeGreaterThan(0);
        expect(res.body.documents[0].fileName).toBe("testFile.txt");
    }));
    it("should return empty array if no documents match the date", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/get-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ date: "2025-12-31" });
        expect(res.status).toBe(200);
        expect(res.body.documents).toEqual([]);
    }));
    it("should return error if date is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/docs/get-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Date not provided");
    }));
});
//# sourceMappingURL=documentController.test.js.map