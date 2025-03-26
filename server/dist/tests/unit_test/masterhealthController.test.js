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
const masterHealthModel_1 = __importDefault(require("../../models/masterHealthModel"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
let mongoServer;
let server;
let userId;
let authToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    yield mongoose_1.default.connect(mongoServer.getUri());
    server = app_1.default.listen(7000);
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
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
    server.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield masterHealthModel_1.default.deleteMany();
}));
describe('Master Health Controller Tests', () => {
    describe('POST /v1/master-health/update-master-health', () => {
        it('should create a new master health report', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = { _id: new mongoose_1.default.Types.ObjectId() };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/v1/master-health/update-master-health')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                tests: [
                    {
                        categories: 'Blood Test',
                        parameters: { hemoglobin: 13.5, whiteBloodCell: 4000 }
                    }
                ]
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'New lab report created');
            expect(response.body.report.tests).toHaveLength(1);
        }));
        it('should return an error if tests data is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/v1/master-health/update-master-health')
                .set('Authorization', `Bearer ${authToken}`)
                .send({});
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Invalid or missing tests data');
        }));
    });
    describe('GET /v1/master-health/update-master-health', () => {
        it('should return master health data for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = new mongoose_1.default.Types.ObjectId();
            yield masterHealthModel_1.default.create({
                userId,
                tests: [
                    {
                        categories: 'Blood Test',
                        parameters: { hemoglobin: 14.2, whiteBloodCell: 4200 }
                    }
                ]
            });
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/v1/master-health/get-master-health')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Master Health data is Found');
            // expect(response.body.data).toHaveLength(1);
        }));
        it('should return a message when no health data is found', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/v1/master-health/get-master-health')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Master Health data is Found');
        }));
    });
});
describe("Master Health API Integration Tests", () => {
    it("should return an error if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/v1/master-health/get-master-health");
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
            .post("/v1/master-health/update-master-healt")
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
            .post("/v1/master-health/update-master-healt")
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
            .post("/v1/master-health/update-master-healt")
            .set("Authorization", `Bearer ${authToken}`)
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid or missing tests data");
    }));
    it("should fetch the master health report", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/master-health/get-master-health")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Master Health data is Found");
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].tests.length).toBe(2);
    }));
    it("should return empty data if no master health report is found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield masterHealthModel_1.default.deleteMany();
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/v1/master-health/get-master-health")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("There is no Master Health is not Found");
    }));
});
//# sourceMappingURL=masterhealthController.test.js.map