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
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongoose_1.default.connect(mongoServer.getUri());
    mongoose_1.default.connection.once('open', () => console.log('MongoDB Memory Server connected'));
    server = app_1.default.listen(4000);
    const user = new userModel_1.default({
        userName: "Test User",
        email: "testuser@example.com",
        password: "password123",
        emailVerified: true,
    });
    yield user.save();
    userId = user._id;
    authToken = (0, authController_1.signToken)(user._id.toString());
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("User Controller - Update User Details", () => {
    it("should successfully update user details", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = {
            userName: "Updated User",
            emergencyContact: 9876543210,
            emergencyName: "John Doe",
            gender: "Male",
            dob: new Date("1990-01-01"),
            age: 34,
            idType: "Aadhar",
            idNumber: 123456789012,
            nameCard: "John Card",
            namePhysician: "Dr. Smith",
            pincode: 560001,
            state: "Karnataka",
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedData);
        expect(res.body.message).toBe("User details updated successfully");
        expect(res.status).toBe(200);
        expect(res.body.updatedUser.userName).toBe("Updated User");
        expect(res.body.isValid).toBe(true);
        expect(res.body.verifyEmail).toBe(true);
        expect(res.body.isCompleteUserDetails).toBe(true);
    }));
    it("should return an error when request body is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .set("Authorization", `Bearer ${authToken}`)
            .send({});
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User details updated successfully");
    }));
    it("should return an error when required fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
            userName: "Partial User",
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User details updated successfully");
    }));
    it("should return an error if the user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .send({
            userName: "Unauthorized User",
            emergencyContact: "1234567890",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized access");
    }));
    it("should return an error if email is not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        const unverifiedUser = new userModel_1.default({
            userName: "Unverified User",
            email: "unverified@example.com",
            password: "password123",
            emailVerified: false,
        });
        yield unverifiedUser.save();
        const newAuthToken = (0, authController_1.signToken)(unverifiedUser._id.toString());
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .set("Authorization", `Bearer ${newAuthToken}`)
            .send({
            userName: "Still Unverified",
            emergencyContact: "1234567890",
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Email not verified");
        expect(res.body.isValid).toBe(false);
        expect(res.body.verifyEmail).toBe(false);
        expect(res.body.isCompleteUserDetails).toBe(false);
    }));
    it("should return 404 error if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistAuthToken = "give me some error";
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/user/update-user")
            .set("Authorization", `Bearer ${nonExistAuthToken}`)
            .send({
            userName: "Non-existent User",
            emergencyContact: "0000000000",
        });
        expect(res.body.message).toBe("Unauthorized access");
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=userController.test.js.map