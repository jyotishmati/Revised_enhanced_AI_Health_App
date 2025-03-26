"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const parameterSchema = new mongoose_1.default.Schema({
    categories: { type: String, required: true },
    parameters: { type: Map, of: Number },
});
const MasterHealthSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tests: [parameterSchema],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, { timestamps: true });
const MasterHealthModel = mongoose_1.default.model("MasterHealth", MasterHealthSchema);
exports.default = MasterHealthModel;
//# sourceMappingURL=masterHealthModel.js.map