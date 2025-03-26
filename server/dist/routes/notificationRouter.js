"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
router.get("/get-notifications", authController_1.protect, notificationController_1.getAllNotification);
router.post("/create-notification", authController_1.protect, notificationController_1.createNotification);
// router.post("/delete-notification", protect)
exports.default = router;
//# sourceMappingURL=notificationRouter.js.map