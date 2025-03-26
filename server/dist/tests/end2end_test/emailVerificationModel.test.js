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
const app_1 = __importDefault(require("./../../app"));
const emailVerificationModel_1 = __importDefault(require("../../models/emailVerificationModel"));
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Email Verification API End-to-End Tests", () => {
    it("should create an email verification entry", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationData = {
            email: "testuser@example.com",
            secret: 123456,
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/email/verify-request")
            .send(emailVerificationData);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Verification email sent successfully");
        const savedVerification = yield emailVerificationModel_1.default.findOne({
            email: "testuser@example.com",
        });
        expect(savedVerification).toBeTruthy();
        expect(savedVerification === null || savedVerification === void 0 ? void 0 : savedVerification.secret).toBe(123456);
        expect(savedVerification === null || savedVerification === void 0 ? void 0 : savedVerification.expiresAt).toBeDefined();
    }));
    it("should return an error when the same email tries to verify again", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationData = {
            email: "testuser@example.com",
            secret: 654321,
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/email/verify-request")
            .send(emailVerificationData);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Email verification request already exists");
    }));
    it("should delete expired email verification entries after 600 seconds", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationData = {
            email: "expired@example.com",
            secret: 987654,
            expiresAt: new Date(Date.now() - 601 * 1000), // Set to past
        };
        yield emailVerificationModel_1.default.create(emailVerificationData);
        // Wait for the TTL index to remove the expired document
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        const expiredVerification = yield emailVerificationModel_1.default.findOne({
            email: "expired@example.com",
        });
        expect(expiredVerification).toBeNull();
    }));
    it("should verify the secret and delete the entry after successful verification", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationData = {
            email: "testverify@example.com",
            secret: 123789,
        };
        yield emailVerificationModel_1.default.create(emailVerificationData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/email/verify")
            .send({ email: "testverify@example.com", secret: 123789 });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Email successfully verified");
        const deletedEntry = yield emailVerificationModel_1.default.findOne({
            email: "testverify@example.com",
        });
        expect(deletedEntry).toBeNull();
    }));
    it("should return an error if the secret is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const emailVerificationData = {
            email: "wrongsecret@example.com",
            secret: 567890,
        };
        yield emailVerificationModel_1.default.create(emailVerificationData);
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/email/verify")
            .send({ email: "wrongsecret@example.com", secret: 111222 });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid verification code");
        const existingEntry = yield emailVerificationModel_1.default.findOne({
            email: "wrongsecret@example.com",
        });
        expect(existingEntry).not.toBeNull();
    }));
});
//# sourceMappingURL=emailVerificationModel.test.js.map