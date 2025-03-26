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
const express_1 = __importDefault(require("express"));
const blogsController_1 = require("../../controllers/blogsController");
const fs_1 = __importDefault(require("fs"));
jest.mock("fs");
const app = (0, express_1.default)();
app.get("/blogs", blogsController_1.getBlogs);
describe("GET /blogs", () => {
    it("should return blogs successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockData = JSON.stringify([
            {
                "photo_url": "https://example.com/image1.jpg",
                "heading": "Understanding AI in 2025",
                "description": "A deep dive into how artificial intelligence is evolving in 2025.",
                "date": "2025-02-15"
            }
        ]);
        fs_1.default.readFile.mockImplementation((_filePath, _encoding, callback) => {
            callback(null, mockData);
        });
        const response = yield (0, supertest_1.default)(app).get("/blogs");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Blogs retrieved successfully");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.length).toBe(1);
    }));
    it("should return 500 if file reading fails", () => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.readFile.mockImplementation((_filePath, _encoding, callback) => {
            callback(new Error("File read error"), null);
        });
        const response = yield (0, supertest_1.default)(app).get("/blogs");
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message", "Internal server error");
    }));
    it("should return 500 if JSON is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.readFile.mockImplementation((_filePath, _encoding, callback) => {
            callback(null, "Invalid JSON");
        });
        const response = yield (0, supertest_1.default)(app).get("/blogs");
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message", "Invalid JSON format in blogs.json");
    }));
});
//# sourceMappingURL=blogsController.test.js.map