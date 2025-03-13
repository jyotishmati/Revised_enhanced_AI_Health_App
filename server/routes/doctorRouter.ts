import express from "express";
import { protect } from "../controllers/authController";
import {
  createDoctor,
  getAllDoctors,
  getOneDoctor,
} from "../controllers/doctorController";

const router = express.Router();

router.use(protect);

router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getOneDoctor);
router.post("/doctors", createDoctor);

export default router;
