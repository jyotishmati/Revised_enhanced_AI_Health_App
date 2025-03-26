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
exports.getMasterHealth = exports.createMasterHealth = void 0;
const masterHealthModel_1 = __importDefault(require("../models/masterHealthModel"));
const createMasterHealth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { tests } = req.body;
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!tests || !Array.isArray(tests)) {
            return res.status(400).json({ message: "Invalid or missing tests data" });
        }
        const userId = user._id;
        let labReport = yield masterHealthModel_1.default.findOne({ userId });
        if (!labReport) {
            labReport = new masterHealthModel_1.default({
                userId,
                tests,
            });
            yield labReport.save();
            return res.status(200).json({ message: "New lab report created", report: labReport });
        }
        tests.forEach((newTest) => {
            const existingTest = labReport.tests.find((test) => test.categories === newTest.categories);
            if (existingTest) {
                Object.entries(newTest.parameters).forEach(([key, value]) => {
                    existingTest.parameters.set(key, value);
                });
            }
            else {
                labReport.tests.push(newTest);
            }
        });
        yield labReport.save();
        return res.status(200).json({ message: "Lab report updated", report: labReport });
    }
    catch (error) {
        console.error("Error updating lab report:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createMasterHealth = createMasterHealth;
const getMasterHealth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const userId = user._id;
    const allMasterHealth = yield masterHealthModel_1.default.find({ userId });
    if (!allMasterHealth) {
        res.status(200).json({ message: "There is no Master Health is not Found" });
        return;
    }
    res
        .status(200)
        .json({ message: "Master Health data is Found", data: allMasterHealth });
});
exports.getMasterHealth = getMasterHealth;
//# sourceMappingURL=masterHealthController.js.map