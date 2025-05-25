"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    otp: String,
    userId: String,
    status: String,
    expireAt: {
        type: Date,
        expires: 180,
    },
}, { timestamps: true });
const OTP = mongoose_1.default.model("OTP", otpSchema, "otps");
exports.default = OTP;
