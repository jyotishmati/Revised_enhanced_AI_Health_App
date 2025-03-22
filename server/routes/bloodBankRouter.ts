import express from "express";
import { protect } from "../controllers/authController";
import { getBloodRadius } from "../controllers/bloodBankController";

const router = express.Router();

router.use(protect);
router.post("/get-nearest-donor", getBloodRadius);

export default router;
