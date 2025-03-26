"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.protect = exports.emailPasswordVerify = exports.signToken = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailVerifier_1 = require("./emailVerifier");
const userController_1 = require("./userController");
dotenv_1.default.config();
const signToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET is not defined");
    const expire = process.env.JWT_EXPIRES_IN;
    if (!expire)
        throw new Error("JWT_EXPIRE is not defined ");
    return jwt.sign({ id }, secret, {
        expiresIn: "9d",
    });
};
exports.signToken = signToken;
const emailPasswordVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            res.status(400).json({ message: "Email or Password is missing" });
            return;
        }
        let user = yield userModel_1.default.findOne({ email }).select("+password");
        if (!user) {
            const newUser = new userModel_1.default({ email, password });
            yield newUser.save();
            const token = (0, exports.signToken)(newUser._id.toString());
            yield (0, emailVerifier_1.sendVerificationEmail)(email);
            res.status(201).json({
                token,
                verifyEmail: false,
                isCorrectPassword: false,
                message: "Email verification has been sent",
            });
            return;
        }
        console.log(password, user.password);
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                isCorrectPassword: false,
                message: "Incorrect password",
            });
            return;
        }
        const token = (0, exports.signToken)(user._id.toString());
        if (!user.emailVerified) {
            try {
                yield (0, emailVerifier_1.sendVerificationEmail)(email);
            }
            catch (err) {
                console.error("Failed to send verification email:", err);
                res.status(500).json({ message: "Error sending verification email" });
                return;
            }
            res.status(202).json({
                token,
                verifyEmail: false,
                isCompleteUserDetails: false,
                isValid: false,
                message: "Email verification has been sent",
            });
            return;
        }
        if (!user.userName || !user.emergencyContact || !user.gender || !user.dob) {
            res.status(200).json({
                token,
                verifyEmail: true,
                isCompleteUserDetails: false,
                isValid: false,
                message: "User details are incomplete",
            });
            return;
        }
        res.status(201).json({
            isValid: true,
            verifyEmail: true,
            isCompleteUserDetails: true,
            message: "User is valid",
            token,
        });
    }
    catch (err) {
        console.error("Error verifying email and password", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.emailPasswordVerify = emailPasswordVerify;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token;
        if (req.headers &&
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            res.status(401).json({ message: "Unauthorized access" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = yield userModel_1.default.findById(decoded.id);
        if (!currentUser) {
            res.status(401).json({ message: "User no longer exists" });
            return;
        }
        res.locals.user = currentUser;
        if (req.headers.coordinates) {
            const coordinatesHeader = Array.isArray(req.headers.coordinates)
                ? req.headers.coordinates[0]
                : req.headers.coordinates;
            const arrayCoordinates = JSON.parse(coordinatesHeader);
            yield (0, userController_1.updateUserCoordinates)({ userId: currentUser._id, coordinates: arrayCoordinates });
        }
        next();
    }
    catch (err) {
        console.error("Error in protect middleware", err);
        res.status(404).json({ message: "Unauthorized access" });
    }
});
exports.protect = protect;
//# sourceMappingURL=authController.js.map