import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { Types } from "mongoose";

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({ message: "Token validation failed" });
    }

    const existingUser = await UserModel.findById(user._id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found in database",
        isValid: false,
        verifyEmail: true,
        isCompleteUserDetails: false,
      });
    }

    if (!user.emailVerified) {
      return res.status(200).json({
        message: "Email not verified",
        isValid: false,
        verifyEmail: false,
        isCompleteUserDetails: false,
      });
    }

    const updateFields: Partial<typeof req.body> = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    });

    if (updateFields.dob) {
      updateFields.dob = new Date(updateFields.dob);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        isValid: false,
        verifyEmail: true,
        isCompleteUserDetails: false,
      });
    }

    res.status(200).json({
      message: "User details updated successfully",
      updatedUser,
      isValid: true,
      verifyEmail: true,
      isCompleteUserDetails: true,
    });
  } catch (err: any) {
    console.error("Error updating user details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({ message: "Token validation failed" });
    }
    const existingUser = await UserModel.findById(user._id);
    if (!existingUser) {
      res.status(404).json({
        message: "User not found in database",
        isValid: false,
        verifyEmail: true,
        isCompleteUserDetails: false,
      });
      return;
    }
    res.status(200).json({
      message: "User message extracted successfully",
      existingUser,
    });

    return;
  } catch (err: any) {
    console.error("Error updating user details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserCoordinates = async ({
  userId,
  coordinates,
}: {
  userId: Types.ObjectId;
  coordinates: [number, number];
}): Promise<void> => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }
    user.currCoordinates = {
      type: "Point",
      coordinates: coordinates, 
    };
    await user.save();
    return;
  } catch (err: any) {
    console.error("Error updating user details:", err);
  }
};
