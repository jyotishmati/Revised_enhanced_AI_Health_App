"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    alertLevel: {
        type: String,
        enum: ["red", "yellow", "green", "normal"],
        default: "normal",
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, index: { expires: 0 } },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true });
NotificationSchema.methods.isExpired = function () {
    return this.endTime && this.endTime < new Date();
};
NotificationSchema.statics.getActiveNotifications = function () {
    return this.find({ endTime: { $gt: new Date() } });
};
const NotificationModel = mongoose_1.default.model("Notification", NotificationSchema);
exports.default = NotificationModel;
//# sourceMappingURL=notificationModel.js.map