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
exports.getBlogs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(__dirname, "./blogs.json");
        fs_1.default.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading blogs.json:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            try {
                const blogs = JSON.parse(data);
                res.status(200).json({ message: "Blogs retrieved successfully", data: blogs });
            }
            catch (jsonError) {
                console.error("Error parsing blogs.json:", jsonError);
                res.status(500).json({ message: "Invalid JSON format in blogs.json" });
            }
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getBlogs = getBlogs;
//# sourceMappingURL=blogsController.js.map