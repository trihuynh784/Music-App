import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: String,
    userId: String,
    status: String,
    expireAt: {
      type: Date,
      expires: 180,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", otpSchema, "otps");

export default OTP;
