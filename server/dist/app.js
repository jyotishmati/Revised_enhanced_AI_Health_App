"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const documentRouter_1 = __importDefault(require("./routes/documentRouter"));
const notificationRouter_1 = __importDefault(require("./routes/notificationRouter"));
const masterHealthRouter_1 = __importDefault(require("./routes/masterHealthRouter"));
const chatBotRouter_1 = __importDefault(require("./routes/chatBotRouter"));
const blogsRouter_1 = __importDefault(require("./routes/blogsRouter"));
const doctorRouter_1 = __importDefault(require("./routes/doctorRouter"));
const bloodBankRouter_1 = __importDefault(require("./routes/bloodBankRouter"));
require("./controllers/cronJob");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/v1/user", userRouter_1.default);
app.use("/v1/docs", documentRouter_1.default);
app.use("/v1/doctor", doctorRouter_1.default);
app.use("/v1/notification", notificationRouter_1.default);
app.use("/v1/master-health", masterHealthRouter_1.default);
app.use("/v1/chatBot", chatBotRouter_1.default);
app.use("/v1/blogs", blogsRouter_1.default);
app.use("/v1/blood-bank", bloodBankRouter_1.default);
exports.default = app;
// artillery run performance.yml
//# sourceMappingURL=app.js.map