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
exports.verifyEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const emailVerificationModel_1 = __importDefault(require("../models/emailVerificationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authController_1 = require("./authController");
dotenv_1.default.config();
const transponder = nodemailer_1.default.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});
const sendVerificationEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.log("GMAIL_USER and GMAIL_PASS is not extracting from .env");
            return;
        }
        const secret = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const currentEmail = yield emailVerificationModel_1.default.findOne({ email });
        if (currentEmail && expiresAt > currentEmail.expiresAt) {
            console.log("OTP is already sent or wait for 10min");
            return;
        }
        if (currentEmail && expiresAt < currentEmail.expiresAt) {
            yield emailVerificationModel_1.default.deleteOne({ email });
        }
        const mailOption = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${secret} It is valid for 10 minutes.`,
        };
        yield transponder.sendMail(mailOption);
        yield emailVerificationModel_1.default.create({
            email,
            secret,
            expiresAt,
        });
        console.log("Email verification sent Successfully");
        return;
    }
    catch (err) {
        console.log("Error in Sending Verify Email", err);
        return;
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
    }
    const user = res.locals.user;
    console.log("user = ", res.locals.user);
    const email = user.email;
    const secret = req.body.secret;
    if (!secret || !email) {
        return res.status(400).json({ message: "Email or OTP is not provided" });
    }
    const checkVerified = yield userModel_1.default.findOne({ email });
    if (!checkVerified) {
        return res.status(400).json({ message: "User not found" });
    }
    else if (checkVerified.emailVerified) {
        return res.status(400).json({ message: "Email already verified" });
    }
    const record = yield emailVerificationModel_1.default.findOne({ email, secret });
    if (!record) {
        return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
    if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
        yield emailVerificationModel_1.default.deleteOne({ email });
        return res.status(400).json({ message: "OTP expired" });
    }
    console.log(record);
    yield emailVerificationModel_1.default.deleteOne({ email });
    const currentUser = yield userModel_1.default.findOne({ email });
    if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
    }
    currentUser.emailVerified = true;
    yield currentUser.save();
    const token = (0, authController_1.signToken)(user._id.toString());
    if (!currentUser.userName ||
        !currentUser.emergencyContact ||
        !currentUser.gender ||
        !currentUser.dob) {
        return res.status(200).json({
            token,
            verifyEmail: true,
            isCompleteUserDetails: false,
            message: "User details are incomplete",
        });
    }
    return res.status(200).json({ message: "Email Verified Successfully" });
});
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=emailVerifier.js.map