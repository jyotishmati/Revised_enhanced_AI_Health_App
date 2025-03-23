import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { Types } from "mongoose";
import { messaging } from "firebase-admin";

interface IBloodDonors {
  name: string;
  userId: Types.ObjectId;
  coordinates: [number, number];
  phno: number;
}
export const getBloodRadius = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = res.locals.user;
    if (!user) {
      res.status(401).json({ message: "Token validation failed" });
      return;
    }

    const { bloodType } = req.body;
    console.log(bloodType)
    if (!bloodType) {
      res.status(400).json({ message: "Please Provide the Blood Type" });
      return;
    }

    const existingUser = await UserModel.findById(user._id).select(
      "currCoordinates"
    );
    if (
      !existingUser ||
      !existingUser.currCoordinates ||
      (existingUser.currCoordinates[0] == 0 &&
        existingUser.currCoordinates[1] == 0)
    ) {
      res.status(400).json({ message: "Location is not provided" });
      return;
    }
    const { coordinates } = existingUser.currCoordinates;
    const [lat, lng] = coordinates;

    if (lat === 0 && lng === 0) {
      res.status(400).json({ message: "Location is not provided" });
      return;
    }

    console.log("User Coordinates:", existingUser.currCoordinates);

    const bloodDonors: IBloodDonors[] = await UserModel.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lat, lng] },
          distanceField: "distance",
          query: { bloodType },
          key: "currCoordinates",
          spherical: true,
          maxDistance: 50000,
        },
      },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          userName: 1,
          userId: "$_id",
          coordinates: "$currCoordinates.coordinates",
          phno: 1,
        },
      },
    ]);

    if (!bloodDonors.length) {
      res.status(200).json({ message: "No blood donors found in the area" });
      return;
    }

    res.status(200).json({
      message: "Top 10 blood donors found",
      topDonors: bloodDonors,
      nearestDonor: bloodDonors[0],
    });
    return;
  } catch (err: any) {
    console.error("❌ Error fetching blood donors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
