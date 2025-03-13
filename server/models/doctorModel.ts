import mongoose from "mongoose";

export type DoctorType = {
    firstName: string;
    lastName: string;
    image: string;
    specialist: string;
    location: string;
    experience: number;
    about: string;
    workingTime: string;
    education: string;
  };

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    specialist: {
      type: String,
      required: [true, "specialist is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    experience: {
      type: Number,
    },
    about: {
      type: String,
      required: [true, "about is required"],
    },
    workingTime: {
      type: String,
      required: [true, "working time is required"],
    },
    education: {
      type: String,
      required: [true, "education is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("Doctor", doctorSchema);