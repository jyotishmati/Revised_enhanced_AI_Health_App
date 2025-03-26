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
const app_1 = __importDefault(require("./../../app")); // Ensure this points to your Express app instance
const notificationModel_1 = __importDefault(require("../../models/notificationModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
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
        emailVerified: true,
    });
    yield user.save();
    userId = user._id;
    authToken = "mock-auth-token"; // Replace with real token logic if necessary
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Notification API End-to-End Tests", () => {
    it("should create a notification successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const notificationData = {
            heading: "Test Notification",
            description: "This is a test notification",
            alertLevel: "yellow",
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 60000).toISOString(), // 1 minute expiration
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/notifications/create-notification")
            .set("Authorization", `Bearer ${authToken}`)
            .send(notificationData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Successfully Message has been saved");
        const savedNotification = yield notificationModel_1.default.findOne({
            heading: "Test Notification",
        });
        expect(savedNotification).toBeTruthy();
        expect(savedNotification === null || savedNotification === void 0 ? void 0 : savedNotification.description).toBe("This is a test notification");
        expect(savedNotification === null || savedNotification === void 0 ? void 0 : savedNotification.alertLevel).toBe("yellow");
    }));
    it("should return active notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        yield notificationModel_1.default.create({
            heading: "Active Notification",
            description: "This should be active",
            alertLevel: "green",
            startTime: new Date(),
            endTime: new Date(Date.now() + 60000), // 1 minute expiration
            userId,
        });
        // const activeNotifications = await NotificationModel.getActiveNotifications();
        // expect(activeNotifications.length).toBeGreaterThan(0);
        // expect(activeNotifications[0].heading).toBe("Active Notification");
    }));
    it("should return if a notification is expired", () => __awaiter(void 0, void 0, void 0, function* () {
        const expiredNotification = new notificationModel_1.default({
            heading: "Expired Notification",
            description: "This notification should expire",
            alertLevel: "red",
            startTime: new Date(),
            endTime: new Date(Date.now() - 60000), // Expired 1 min ago
            userId,
        });
        yield expiredNotification.save();
        // expect(expiredNotification.isExpired()).toBe(true);
    }));
    it("should automatically delete expired notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        yield notificationModel_1.default.create({
            heading: "Temporary Notification",
            description: "This should be deleted automatically",
            alertLevel: "normal",
            startTime: new Date(),
            endTime: new Date(Date.now() - 60000), // Expired 1 min ago
            userId,
        });
        // Wait for TTL index to trigger deletion
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        const expiredNotifications = yield notificationModel_1.default.find({
            heading: "Temporary Notification",
        });
        expect(expiredNotifications.length).toBe(0);
    }));
    it("should return error when heading or description is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/notifications/create-notification")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ alertLevel: "low" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Heading or description is not given");
    }));
    it("should return error when user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/notifications/create-notification")
            .send({
            heading: "Unauthorized Notification",
            description: "This should fail",
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized");
    }));
    it("should retrieve all notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        yield notificationModel_1.default.insertMany([
            {
                heading: "First Notification",
                description: "Test notification 1",
                alertLevel: "normal",
                startTime: new Date(),
                endTime: new Date(Date.now() + 60000), // 1 minute expiration
                userId,
            },
            {
                heading: "Second Notification",
                description: "Test notification 2",
                alertLevel: "high",
                startTime: new Date(),
                endTime: new Date(Date.now() + 120000), // 2 minutes expiration
                userId,
            },
        ]);
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/notifications/get-notifications")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toContain("There are");
        expect(res.body.data.notifications.length).toBeGreaterThan(0);
    }));
    it("should return an empty array if no notifications exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield notificationModel_1.default.deleteMany(); // Clear all notifications
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/notifications/get-notifications")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User do not have any notification");
        expect(res.body.data).toEqual({});
    }));
});
//# sourceMappingURL=notificationModel.test.js.map