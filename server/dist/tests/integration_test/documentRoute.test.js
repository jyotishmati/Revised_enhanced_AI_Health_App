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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../../app"));
const documentModel_1 = __importDefault(require("../../models/documentModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
let mongoServer;
let authToken;
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri);
    const user = new userModel_1.default({
        userName: "Test User",
        email: "testuser@example.com",
        password: "password123",
        emailVerified: true,
    });
    yield user.save();
    userId = user._id;
    authToken = "mock-auth-token";
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Document API Integration Tests", () => {
    it("should return working response for /docs-working", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/docs/docs-working");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Working Docs Successfully");
    }));
    it("should store a document successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testFile.txt");
        require("fs").writeFileSync(filePath, "Test content");
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/docs/save-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .field("date", new Date().toISOString())
            .attach("file", filePath);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("File stored successfully");
        expect(res.body).toHaveProperty("fileId");
        expect(res.body).toHaveProperty("encryptedFileId");
        require("fs").unlinkSync(filePath);
    }));
    it("should return an error if no file is uploaded", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/docs/save-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ date: new Date().toISOString() });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("No file uploaded");
    }));
    it("should return an error if date is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testFile.txt");
        require("fs").writeFileSync(filePath, "Test content");
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/docs/save-docs")
            .set("Authorization", `Bearer ${authToken}`)
            .attach("file", filePath);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Date or userId is not defined");
        // Clean up
        require("fs").unlinkSync(filePath);
    }));
    it("should return an error if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, "testFile.txt");
        require("fs").writeFileSync(filePath, "Test content");
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/docs/save-docs")
            .attach("file", filePath)
            .field("date", new Date().toISOString());
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("User not LoggedIN");
        // Clean up
        require("fs").unlinkSync(filePath);
    }));
    it("should fetch documents by date", () => __awaiter(void 0, void 0, void 0, function* () {
        const testDate = new Date().toISOString();
        // Store a document in the database
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
            .post("/api/docs/get-docs")
            .send({ date: testDate });
        expect(res.status).toBe(200);
        expect(res.body.documents.length).toBeGreaterThan(0);
        expect(res.body.documents[0].fileName).toBe("testFile.txt");
    }));
    it("should return empty array if no documents match the date", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/docs/get-docs")
            .send({ date: "2025-12-31" });
        expect(res.status).toBe(200);
        expect(res.body.documents).toEqual([]);
    }));
    it("should return error if date is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/docs/get-docs").send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Date not provided");
    }));
});
//# sourceMappingURL=documentRoute.test.js.map