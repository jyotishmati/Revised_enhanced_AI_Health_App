"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsController_1 = require("../controllers/blogsController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.use(authController_1.protect);
router.get("/who-blogs", blogsController_1.getBlogs);
exports.default = router;
//# sourceMappingURL=blogsRouter.js.map