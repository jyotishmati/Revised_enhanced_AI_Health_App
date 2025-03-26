"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const doctorController_1 = require("../controllers/doctorController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.get("/doctors", doctorController_1.getAllDoctors);
router.get("/doctors/:id", doctorController_1.getOneDoctor);
router.post("/doctors", doctorController_1.createDoctor);
exports.default = router;
//# sourceMappingURL=doctorRouter.js.map