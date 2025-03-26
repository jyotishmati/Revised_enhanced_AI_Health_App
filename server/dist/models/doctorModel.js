"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    specialist: {
        type: String,
        required: [true, "specialist is required"],
    },
    location: {
        type: String,
        required: [true, "location is required"],
    },
    experience: {
        type: Number,
    },
    about: {
        type: String,
        required: [true, "about is required"],
    },
    workingTime: {
        type: String,
        required: [true, "working time is required"],
    },
    education: {
        type: String,
        required: [true, "education is required"],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Doctor", doctorSchema);
//# sourceMappingURL=doctorModel.js.map