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
exports.createDoctor = exports.getOneDoctor = exports.getAllDoctors = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
exports.default = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
const getAllDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctorModel_1.default.find();
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
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllDoctors = getAllDoctors;
const getOneDoctor = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "id not found",
                });
            }
            const doctor = yield doctorModel_1.default.findById(id);
            res.status(200).json({
                status: "success",
                message: {
                    doctor,
                },
            });
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.getOneDoctor = getOneDoctor;
const createDoctor = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data.firstName ||
                !data.lastName ||
                !data.image ||
                !data.specialist ||
                !data.location ||
                !data.about ||
                !data.education ||
                !data.experience ||
                !data.workingTime) {
                return res.status(400).json({
                    status: "error",
                    message: "data insufficient",
                });
            }
            const doctor = yield doctorModel_1.default.create({
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
        }
        catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.createDoctor = createDoctor;
//# sourceMappingURL=doctorController.js.map