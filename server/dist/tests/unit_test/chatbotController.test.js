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
const chatModel_1 = __importDefault(require("../../models/chatModel"));
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
    server = app_1.default.listen(4100);
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
describe("Chat Controller Tests", () => {
    let chatCreatedAt;
    it("should create a chat successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const chatData = {
            sender: "chatbot",
            message: "Hello, this is a test message",
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/chatBot/create-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .send(chatData);
        expect(res.body.message).toBe("Chat stored successfully");
        expect(res.status).toBe(201);
        expect(res.body.data.sender).toBe(chatData.sender);
        expect(res.body.data.message).toBe(chatData.message);
        chatCreatedAt = res.body.data.createdAt;
    }));
    it("should return an error if sender or message is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/chatBot/create-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ sender: "chatbot" });
        expect(res.body.message).toBe("Sender or Message is not provided");
        expect(res.status).toBe(400);
    }));
    it("should return an error if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/chatBot/create-chat")
            .send({ sender: "Test", message: "Unauthenticated request" });
        expect(res.body.message).toBe("Unauthorized access");
        expect(res.status).toBe(401);
    }));
    it("should retrieve all chats", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/chatBot/get-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .query({ page: 1 });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Chats retrieved");
        expect(res.body.data.length).toBeGreaterThan(0);
    }));
    it("should return empty array when no chats exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield chatModel_1.default.deleteMany({});
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/chatBot/get-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .query({ page: 1 });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("No chats available");
        expect(res.body.data).toEqual([]);
    }));
    it("should delete a chat successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = new chatModel_1.default({
            sender: "chatbot",
            message: "This chat will be deleted",
            userId,
            active: true,
            createdAt: new Date(),
        });
        yield chat.save();
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/chatBot/delete-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ createdAt: chat.createdAt });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Chat successfully deleted");
        const deletedChat = yield chatModel_1.default.findOne({ createdAt: chat.createdAt });
        expect(deletedChat === null || deletedChat === void 0 ? void 0 : deletedChat.active).toBe(false);
    }));
    it("should return error when deleting a non-existent chat", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/v1/chatBot/delete-chat")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ createdAt: new Date() });
        expect(res.body.message).toBe("Chat is already deleted or not found");
        expect(res.status).toBe(200);
    }));
});
//# sourceMappingURL=chatbotController.test.js.map