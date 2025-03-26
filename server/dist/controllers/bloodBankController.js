"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBloodRadius = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getBloodRadius = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        if (!user) {
            res.status(401).json({ message: "Token validation failed" });
            return;
        }
        const { bloodType } = req.body;
        console.log(bloodType);
        if (!bloodType) {
            res.status(400).json({ message: "Please Provide the Blood Type" });
            return;
        }
        const existingUser = yield userModel_1.default.findById(user._id).select("currCoordinates");
        if (!existingUser ||
            !existingUser.currCoordinates ||
            (existingUser.currCoordinates[0] == 0 &&
                existingUser.currCoordinates[1] == 0)) {
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
        const bloodDonors = yield userModel_1.default.aggregate([
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
    }
    catch (err) {
        console.error("❌ Error fetching blood donors:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getBloodRadius = getBloodRadius;
//# sourceMappingURL=bloodBankController.js.map