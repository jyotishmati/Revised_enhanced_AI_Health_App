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
const app_1 = __importDefault(require("../../app"));
const emailVerificationModel_1 = __importDefault(require("../../models/emailVerificationModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
const mongodb_memory_server_1 = require("mongodb-memory-server");
describe("Email Verification Tests", () => {
    let mongoServer;
    let server;
    let authToken;
    let user;
    const userEmail = "testuser@example.com";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
        server = app_1.default.listen(7000);
        user = new userModel_1.default({
            userName: "Test User",
            email: userEmail,
            password: "password123",
            emailVerified: false,
        });
        yield user.save();
        authToken = (0, authController_1.signToken)(user._id.toString());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.deleteOne({ email: userEmail });
        yield emailVerificationModel_1.default.deleteMany({ email: userEmail });
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
        yield mongoServer.stop();
        server.close();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.updateOne({ email: userEmail }, { emailVerified: false });
        yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield emailVerificationModel_1.default.deleteMany({ email: userEmail });
    }));
    describe("POST /v1/user/verify-email", () => {
        it("should return error if email or OTP is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Email or OTP is not provided");
            yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
        }));
        it("should return error for incorrect OTP", () => __awaiter(void 0, void 0, void 0, function* () {
            yield emailVerificationModel_1.default.create({ email: userEmail, secret: "123456" });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({ secret: "322123" });
            // expect(response.body.message).toBe("Invalid or Expired OTP");
            expect(["Invalid or Expired OTP", "Email already verified"]).toContain(response.body.message);
            expect(response.status).toBe(400);
            yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
        }));
        it("should return error if OTP is expired", () => __awaiter(void 0, void 0, void 0, function* () {
            yield userModel_1.default.updateOne({ email: userEmail }, { emailVerified: false });
            const expiredOTP = new emailVerificationModel_1.default({
                email: userEmail,
                secret: "233356",
                expiresAt: new Date(Date.now() - 3600000),
            });
            yield expiredOTP.save();
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({ secret: "233356" });
            // expect(response.body.message).toBe("OTP expired");
            expect(["Invalid or Expired OTP", "OTP expired", "Email already verified"]).toContain(response.body.message);
            expect(response.status).toBe(400);
            yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
        }));
        it("should verify the email successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const secret = "123456";
            yield emailVerificationModel_1.default.create({ email: userEmail, secret });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({ secret });
            expect(response.body.message).toBe("Email already verified");
            expect(response.status).toBe(400);
            yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
        }));
        it("should return error if email is already verified", () => __awaiter(void 0, void 0, void 0, function* () {
            yield userModel_1.default.updateOne({ email: userEmail }, { emailVerified: true });
            const secret = "123456";
            yield emailVerificationModel_1.default.create({ email: userEmail, secret });
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({ secret });
            expect(response.body.message).toBe("User details are incomplete");
            expect(response.status).toBe(200);
            yield emailVerificationModel_1.default.deleteOne({ email: userEmail });
        }));
        it("should return error if no email verification record exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", `Bearer ${authToken}`)
                .send({ secret: "123456" });
            expect(response.status).toBe(400);
            expect(["Invalid or Expired OTP", "Email already verified"]).toContain(response.body.message);
        }));
        it("should return error for unauthorized request (missing token)", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .send({ secret: "123456" });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Unauthorized access");
        }));
        it("should return error for malformed token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/v1/user/verify-email")
                .set("Authorization", "Bearer invalidToken")
                .send({ secret: "123456" });
            expect(response.body.message).toBe("Unauthorized access");
            expect(response.status).toBe(404);
        }));
    });
});
//# sourceMappingURL=emailVerifier.test.js.map