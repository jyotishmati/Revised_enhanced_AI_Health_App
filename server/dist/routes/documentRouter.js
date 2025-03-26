"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const authController_1 = require("../controllers/authController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post("/save-docs", authController_1.protect, upload.single("file"), documentController_1.storeDocument);
router.post("/get-docs", authController_1.protect, documentController_1.fetchDocumentByDate);
router.get("/docs-working", (req, res) => {
    return res.status(200).json({ message: "Working Docs Successfully" });
});
exports.default = router;
//# sourceMappingURL=documentRouter.js.map