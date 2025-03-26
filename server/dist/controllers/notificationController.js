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
exports.getAllNotification = exports.createNotification = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { heading, description, alertLevel = "normal", startTime = new Date(), endTime, } = req.body;
        if (!heading || !description) {
            res.status(400).json({ message: "Heading or description is not given" });
            return;
        }
        const user = res.locals.user;
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        const userId = user._id;
        const notification = new notificationModel_1.default({
            heading,
            description,
            alertLevel,
            startTime,
            userId,
            endTime,
        });
        yield notification.save();
        res.status(200).json({ message: "Successfully Message has been saved" });
        return;
    }
    catch (err) {
        console.log("Error in the notification: ", err);
        res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
    }
});
exports.createNotification = createNotification;
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
    }
    const userId = user._id;
    console.log(userId);
    const notifications = yield notificationModel_1.default.find({ userId });
    if (!notifications) {
        res
            .status(200)
            .json({ message: "User do not have any notification", data: {} });
        return;
    }
    res.status(200).json({
        message: `There are ${notifications.length} are there`,
        data: { notifications },
    });
    return;
});
exports.getAllNotification = getAllNotification;
//# sourceMappingURL=notificationController.js.map