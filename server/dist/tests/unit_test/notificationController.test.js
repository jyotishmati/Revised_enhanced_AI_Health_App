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
const notificationModel_1 = __importDefault(require("../../models/notificationModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
let mongoServer;
let server;
let authToken;
let fakeAuthToken;
let userId;
let fakeUserId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongoose_1.default.connect(mongoServer.getUri());
    server = app_1.default.listen(7000);
    const user = new userModel_1.default({
        userName: "Test User",
        email: "testuser22@example.com",
        password: "password123",
        emailVerified: true,
    });
    yield user.save();
    userId = user._id;
    authToken = (0, authController_1.signToken)(user._id.toString());
    const fakeUser = new userModel_1.default({
        userName: "Test Fake User",
        email: "fake22@example.com",
        password: "password123",
        emailVerified: true,
    });
    yield fakeUser.save();
    fakeUserId = fakeUser._id;
    fakeAuthToken = (0, authController_1.signToken)(fakeUser._id.toString());
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Notification Controller Tests", () => {
    it("should create a notification successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const notificationData = {
            heading: "System Maintenance",
            description: "Scheduled system maintenance at midnight.",
            alertLevel: "red",
            startTime: new Date(),
            endTime: new Date(Date.now() + 3600 * 1000),
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/notification/create-notification")
            .set("Authorization", `Bearer ${authToken}`)
            .send(notificationData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Successfully Message has been saved");
        const savedNotification = yield notificationModel_1.default.findOne({
            heading: "System Maintenance",
        });
        expect(savedNotification).toBeTruthy();
        expect(savedNotification === null || savedNotification === void 0 ? void 0 : savedNotification.description).toBe("Scheduled system maintenance at midnight.");
    }));
    it("should return an error when heading or description is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/notification/create-notification")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ alertLevel: "low" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Heading or description is not given");
    }));
    it("should return all notifications for a user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new notificationModel_1.default({
            heading: "Meeting Reminder",
            description: "Project meeting at 2 PM",
            alertLevel: "normal",
            startTime: new Date(),
            userId,
        }).save();
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/notification/get-notifications")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data.notifications.length).toBeGreaterThan(0);
        expect(res.body.data.notifications[0].heading).toBe("System Maintenance");
    }));
    it("should return an empty array if user has no notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/notification/get-notifications")
            .set("Authorization", `Bearer ${fakeAuthToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data.notifications).toEqual([]);
    }));
    it("should return error when user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/notification/create-notification")
            .send({
            heading: "Test Alert",
            description: "This is a test notification",
        });
        expect(res.body.message).toBe("Unauthorized access");
        expect(res.status).toBe(401);
    }));
});
//# sourceMappingURL=notificationController.test.js.map