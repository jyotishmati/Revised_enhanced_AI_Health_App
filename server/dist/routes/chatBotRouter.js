"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const chatBotController_1 = require("../controllers/chatBotController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.post("/create-chat", chatBotController_1.createChat);
router.get("/get-chat", chatBotController_1.getAllchat);
router.post("/delete-chat", chatBotController_1.deleteChat);
exports.default = router;
//# sourceMappingURL=chatBotRouter.js.map