"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmailVerificationSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    secret: { type: Number, required: true },
    expiresAt: { type: Date, default: new Date(Date.now() + 10 * 60 * 1000), expires: 600 },
}, { timestamps: true });
const EmailVerification = mongoose_1.default.model("EmailVerification", EmailVerificationSchema);
exports.default = EmailVerification;
//# sourceMappingURL=emailVerificationModel.js.map