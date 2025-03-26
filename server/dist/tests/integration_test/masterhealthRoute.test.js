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
const masterHealthModel_1 = __importDefault(require("../../models/masterHealthModel"));
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
    authToken = "mock-auth-token"; // Replace with real token logic if necessary
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe("Master Health API Integration Tests", () => {
    it("should return an error if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/master-health/get-master-health");
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("User not found");
    }));
    it("should create a new master health report", () => __awaiter(void 0, void 0, void 0, function* () {
        const healthData = {
            tests: [
                {
                    categories: "Blood Test",
                    parameters: {
                        hemoglobin: 13.5,
                        cholesterol: 200,
                    },
                },
            ],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/master-health/update-master-health")
            .set("Authorization", `Bearer ${authToken}`)
            .send(healthData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("New lab report created");
        expect(res.body.report.tests.length).toBe(1);
        expect(res.body.report.tests[0].categories).toBe("Blood Test");
    }));
    it("should update an existing master health report", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedHealthData = {
            tests: [
                {
                    categories: "Blood Test",
                    parameters: {
                        hemoglobin: 14.0, // Updated value
                        cholesterol: 180, // Updated value
                    },
                },
                {
                    categories: "Liver Function Test",
                    parameters: {
                        bilirubin: 1.2,
                    },
                },
            ],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/master-health/update-master-health")
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedHealthData);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Lab report updated");
        expect(res.body.report.tests.length).toBe(2); // New category should be added
        expect(res.body.report.tests[0].parameters.hemoglobin).toBe(14.0);
        expect(res.body.report.tests[1].categories).toBe("Liver Function Test");
    }));
    it("should return an error if no tests data is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/master-health/update-master-health")
            .set("Authorization", `Bearer ${authToken}`)
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid or missing tests data");
    }));
    it("should fetch the master health report", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/master-health/get-master-health")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Master Health data is Found");
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].tests.length).toBe(2);
    }));
    it("should return empty data if no master health report is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield masterHealthModel_1.default.deleteMany();
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/master-health/get-master-health")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("There is no Master Health is not Found");
    }));
});
//# sourceMappingURL=masterhealthRoute.test.js.map