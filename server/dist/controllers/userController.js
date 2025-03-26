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
exports.updateUserCoordinates = exports.getUserDetails = exports.updateUserDetails = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.status(401).json({ message: "Token validation failed" });
        }
        const existingUser = yield userModel_1.default.findById(user._id);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found in database",
                isValid: false,
                verifyEmail: true,
                isCompleteUserDetails: false,
            });
        }
        if (!user.emailVerified) {
            return res.status(200).json({
                message: "Email not verified",
                isValid: false,
                verifyEmail: false,
                isCompleteUserDetails: false,
            });
        }
        const updateFields = {};
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined) {
                updateFields[key] = req.body[key];
            }
        });
        if (updateFields.dob) {
            updateFields.dob = new Date(updateFields.dob);
        }
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(user._id, { $set: updateFields }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                isValid: false,
                verifyEmail: true,
                isCompleteUserDetails: false,
            });
        }
        res.status(200).json({
            message: "User details updated successfully",
            updatedUser,
            isValid: true,
            verifyEmail: true,
            isCompleteUserDetails: true,
        });
    }
    catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateUserDetails = updateUserDetails;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.status(401).json({ message: "Token validation failed" });
        }
        const existingUser = yield userModel_1.default.findById(user._id);
        if (!existingUser) {
            res.status(404).json({
                message: "User not found in database",
                isValid: false,
                verifyEmail: true,
                isCompleteUserDetails: false,
            });
            return;
        }
        res.status(200).json({
            message: "User message extracted successfully",
            existingUser,
        });
        return;
    }
    catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getUserDetails = getUserDetails;
const updateUserCoordinates = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, coordinates, }) {
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            console.error("User not found");
            return;
        }
        user.currCoordinates = {
            type: "Point",
            coordinates: coordinates,
        };
        yield user.save();
        return;
    }
    catch (err) {
        console.error("Error updating user details:", err);
    }
});
exports.updateUserCoordinates = updateUserCoordinates;
//# sourceMappingURL=userController.js.map