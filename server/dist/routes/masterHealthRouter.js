"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const masterHealthController_1 = require("../controllers/masterHealthController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.get("/get-master-health", masterHealthController_1.getMasterHealth);
router.post("/update-master-health", masterHealthController_1.createMasterHealth);
exports.default = router;
//# sourceMappingURL=masterHealthRouter.js.map