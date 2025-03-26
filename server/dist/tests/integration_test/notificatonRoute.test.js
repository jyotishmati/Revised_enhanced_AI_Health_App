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
describe("Notification API Integration Tests", () => {
    it("should return an error if user is not authenticated when fetching notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/notifications/get-notifications");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized");
    }));
    it("should create a new notification", () => __awaiter(void 0, void 0, void 0, function* () {
        const notificationData = {
            heading: "Test Notification",
            description: "This is a test notification",
            alertLevel: "high",
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour later
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
    }));
    it("should return an error when heading or description is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/notifications/create-notification")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ alertLevel: "low" });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Heading or description is not given");
    }));
    it("should return an error when user is not authenticated for creating notification", () => __awaiter(void 0, void 0, void 0, function* () {
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
        // Insert test notifications
        yield notificationModel_1.default.insertMany([
            {
                heading: "First Notification",
                description: "Test notification 1",
                alertLevel: "normal",
                startTime: new Date(),
                endTime: new Date(Date.now() + 3600 * 1000),
                userId,
            },
            {
                heading: "Second Notification",
                description: "Test notification 2",
                alertLevel: "high",
                startTime: new Date(),
                endTime: new Date(Date.now() + 7200 * 1000),
                userId,
            },
        ]);
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/notifications/get-notifications")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toContain("There are");
        expect(res.body.data.notifications.length).toBe(2);
        expect(res.body.data.notifications[0].heading).toBe("First Notification");
        expect(res.body.data.notifications[1].heading).toBe("Second Notification");
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
//# sourceMappingURL=notificatonRoute.test.js.map