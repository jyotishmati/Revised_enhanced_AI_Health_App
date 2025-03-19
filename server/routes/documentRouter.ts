import express from "express";
import { fetchDocumentByDate, storeDocument } from "../controllers/documentController";
import { protect } from "../controllers/authController";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/save-docs", protect, upload.single("file"), storeDocument)
router.post("/get-docs", protect,fetchDocumentByDate)

router.get("/docs-working", (req, res)=>{
    return res.status(200).json({message: "Working Docs Successfully"})
})

export default router