"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const app_1 = __importDefault(require("../../app"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const authController_1 = require("../../controllers/authController");
const mongodb_memory_server_1 = require("mongodb-memory-server");
describe('Auth Controller Tests', () => {
    let mongoServer;
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
        mongoose_1.default.connection.once('open', () => console.log('MongoDB Memory Server connected'));
        server = app_1.default.listen(7000);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
        yield mongoServer.stop();
        server.close();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.deleteMany();
    }));
    describe('signToken', () => {
        it('should generate a valid JWT token', () => {
            process.env.JWT_SECRET = 'testsecret';
            const token = (0, authController_1.signToken)('12345');
            expect(typeof token).toBe('string');
            const decoded = jwt.verify(token, 'testsecret');
            expect(decoded).toHaveProperty('id', '12345');
        });
    });
    describe('emailPasswordVerify', () => {
        it('should create a new user and send verification email', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/v1/user/login-signup')
                .send({ email: 'test@example.com', password: 'password123' });
            console.log('Response Status:', response.status);
            console.log('Response Body:', response.body);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('verifyEmail', false);
            expect(response.body).toHaveProperty('message', 'Email verification has been sent');
        }));
        it('should return an error for incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash('password123', 12);
            const user = yield userModel_1.default.create({ email: 'test@example.com', password: hashedPassword, emailVerified: true });
            const token = (0, authController_1.signToken)(user._id.toString());
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/v1/user/login-signup')
                .send({ email: 'test@example.com', password: 'wrongpassword' }).set('Authorization', `Bearer ${token}`);
            ;
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Incorrect password');
        }));
    });
    describe('protect', () => {
        it('should block access if token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/v1/user/verify-token');
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Unauthorized access');
        }));
        it('should allow access with a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userModel_1.default.create({ email: 'test@example.com', password: 'password123' });
            const token = (0, authController_1.signToken)(user._id.toString());
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/protected-route')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).not.toBe(401);
        }));
    });
});
//# sourceMappingURL=authController.test.js.map