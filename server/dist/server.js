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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const userModel_1 = __importDefault(require("./models/userModel"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const DB = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.DATABASE.replace("<password>", (_b = process.env) === null || _b === void 0 ? void 0 : _b.DB_PASSWORD)) ||
    "mongodb://localhost:27017";
mongoose_1.default
    .connect(DB)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database is Connected");
    yield userModel_1.default.collection.createIndex({ currCoordinates: "2dsphere" });
    console.log("2dsphere index created successfully");
}))
    .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
});
app_1.default.get("/", (req, res) => {
    res.send("Hello World!");
});
const server = app_1.default.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
// "start": "npx nodemon",
// "dev": "nodemon",
//# sourceMappingURL=server.js.map