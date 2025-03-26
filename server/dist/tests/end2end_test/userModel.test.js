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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_1 = __importDefault(require("./../../app")); // Ensure this points to your Express app instance
const userModel_1 = __importDefault(require("../../models/userModel"));
let mongoServer;
let authToken;
let userId;
let hashedPassword;
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
describe("User Authentication and Profile API End-to-End Tests", () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: "testuser@example.com",
            password: "password123",
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/register")
            .send(userData);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
        const savedUser = yield userModel_1.default.findOne({ email: "testuser@example.com" });
        expect(savedUser).toBeTruthy();
        expect(savedUser === null || savedUser === void 0 ? void 0 : savedUser.emailVerified).toBe(false);
        expect(savedUser === null || savedUser === void 0 ? void 0 : savedUser.password).not.toBe("password123"); // Ensure password is hashed
        userId = savedUser === null || savedUser === void 0 ? void 0 : savedUser._id;
        hashedPassword = savedUser === null || savedUser === void 0 ? void 0 : savedUser.password;
    }));
    it("should hash passwords before saving", () => __awaiter(void 0, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare("password123", hashedPassword);
        expect(isMatch).toBe(true);
    }));
    it("should login successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/login")
            .send({ email: "testuser@example.com", password: "password123" });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Login successful");
        expect(res.body).toHaveProperty("token");
        authToken = res.body.token;
    }));
    it("should return error when logging in with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/login")
            .send({ email: "testuser@example.com", password: "wrongpassword" });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Incorrect email or password");
    }));
    // it("should verify password using `correctPassword` method", async () => {
    //   const user = await UserModel.findOne({ email: "testuser@example.com" });
    //   const isCorrect = await user?.correctPassword("password123");
    //   expect(isCorrect).toBe(true);
    // });
    it("should return user profile data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.email).toBe("testuser@example.com");
    }));
    it("should return error for unauthorized profile access", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/users/profile");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized");
    }));
    it("should return error when registering with an existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/register")
            .send({ email: "testuser@example.com", password: "password456" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Email is already registered");
    }));
    it("should return error when registering without a password", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/register")
            .send({ email: "newuser@example.com" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Please provide a password");
    }));
});
//# sourceMappingURL=userModel.test.js.map