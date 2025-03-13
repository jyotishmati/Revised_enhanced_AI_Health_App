import { Request, Response, NextFunction } from "express";
import doctorModel, { DoctorType } from "../models/doctorModel";

export default (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await doctorModel.find();

    if (!doctors) {
      return res.status(500).json({
        status: "error",
        message: "error fetching doctors",
      });
    }

    res.status(200).json({
      status: "success",
      message: {
        doctors,
      },
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOneDoctor = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id not found",
      });
    }

    const doctor = await doctorModel.findById(id);

    res.status(200).json({
      status: "success",
      message: {
        doctor,
      },
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createDoctor = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: DoctorType = req.body;

    if (
      !data.firstName ||
      !data.lastName ||
      !data.image ||
      !data.specialist ||
      !data.location ||
      !data.about ||
      !data.education ||
      !data.experience ||
      !data.workingTime
    ) {
      return res.status(400).json({
        status: "error",
        message: "data insufficient",
      });
    }

    const doctor = await doctorModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
      specialist: data.specialist,
      location: data.location,
      experience: data.experience,
      about: data.about,
      workingTime: data.workingTime,
      education: data.education,
    });

    if (!doctor) {
      return res.status(500).json({
        status: "error",
        message: "Internal Error",
      });
    }
    return res.status(201).json(doctor);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
