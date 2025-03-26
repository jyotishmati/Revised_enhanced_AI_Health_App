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
const node_cron_1 = __importDefault(require("node-cron"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const processExpiredNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔍 Checking for expired notifications...");
        const expiredNotifications = yield notificationModel_1.default.find({
            status: "active",
            endTime: { $lte: new Date() },
        });
        if (expiredNotifications.length > 0) {
            console.log(`Found ${expiredNotifications.length} expired notifications.`);
            for (let notification of expiredNotifications) {
                console.log(`Expiring: ${notification.heading}`);
                yield notificationModel_1.default.updateOne({ _id: notification._id }, { $set: { status: "expired" } });
            }
        }
        else {
            console.log("No expired notifications found.");
        }
    }
    catch (error) {
        console.error(" Error in cron job:", error);
    }
});
node_cron_1.default.schedule('0 0 * * *', processExpiredNotifications);
exports.default = processExpiredNotifications;
//# sourceMappingURL=cronJob.js.map