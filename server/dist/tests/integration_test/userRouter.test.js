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
const app_1 = __importDefault(require("../../app"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
let mongoServer;
let authToken;
let userId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri);
    // Create a test user for authentication
    const user = new userModel_1.default({
        userName: "Test User",
        email: "testuser@example.com",
        password: "password123",
        emailVerified: false,
    });
    yield user.save();
    userId = user._id;
    authToken = (0, authController_1.signToken)(user._id.toString());
    ;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("User Authentication & Profile API Integration Tests", () => {
    it("should return working response for /user-working", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/users/user-working");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Working User Successfully");
    }));
    it("should log in or sign up a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/users/login-signup").send({
            email: "testuser@example.com",
            password: "password123",
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toContain("Login or Signup Successful");
        expect(res.body).toHaveProperty("token");
    }));
    it("should return an error when login details are incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/users/login-signup").send({
            email: "wronguser@example.com",
            password: "wrongpassword",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    }));
    it("should verify authentication token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/users/verify-token")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.isValid).toBe(true);
        expect(res.body.message).toBe("User logged in successfully");
    }));
    it("should return error for unauthorized token verification", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/users/verify-token");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("User not logged in");
    }));
    it("should verify user email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/verify-email")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Email verification successful");
    }));
    it("should return an error for unauthorized email verification", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/users/verify-email");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized");
    }));
    it("should update user details", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUserData = {
            userName: "Updated User",
            emergencyContact: "9876543210",
            emergencyName: "John Doe",
            gender: "Male",
            dob: "1990-01-01",
            age: 34,
            idType: "Aadhar",
            idNumber: "123456789012",
            nameCard: "John Card",
            namePhysician: "Dr. Smith",
            pincode: "560001",
            state: "Karnataka",
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/update-user")
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedUserData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User details updated successfully");
        expect(res.body.updatedUser.userName).toBe("Updated User");
    }));
    it("should return error if required user details are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/update-user")
            .set("Authorization", `Bearer ${authToken}`)
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Request body cannot be empty");
    }));
    it("should return an error when updating user details without authentication", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/users/update-user").send({
            userName: "Unauthorized Update",
            emergencyContact: "1234567890",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized");
    }));
});
//# sourceMappingURL=userRouter.test.js.map