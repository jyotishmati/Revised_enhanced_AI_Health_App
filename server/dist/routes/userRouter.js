"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const emailVerifier_1 = require("../controllers/emailVerifier");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/login-signup", authController_1.emailPasswordVerify);
router.get("/verify-token", authController_1.protect, (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.status(401).json({ isValid: false, message: "User not logged in" });
        }
        res.status(200).json({ isValid: true, message: "User logged in successfully", user });
    }
    catch (err) {
        console.error("Token verification error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/get-user-details", authController_1.protect, userController_1.getUserDetails);
router.get("/user-working", (req, res) => {
    return res.status(200).json({ message: "Working User Successfully" });
});
router.post("/verify-email", authController_1.protect, emailVerifier_1.verifyEmail);
router.post("/update-user", authController_1.protect, userController_1.updateUserDetails);
exports.default = router;
//# sourceMappingURL=userRouter.js.map