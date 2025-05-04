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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (type, email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const from = type == "signup" ? "OTP REGISTER ACCOUNT" : "OTP RESET PASSWORD";
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_KEY,
        },
    });
    yield transporter.sendMail({
        from: `"${from} 👻👻👻" <${process.env.EMAIL_NAME}>`,
        to: email,
        subject: `Mã OTP của bạn: ${otp} - Không chia sẻ với bất kỳ ai!`,
        html: `<table align="center" width="100%" style="max-width: 500px; background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center">
                <h2 style="color: #007bff; margin-bottom: 10px;">Mã OTP của bạn</h2>
                <p style="color: #555; font-size: 16px;">Sử dụng mã bên dưới để xác thực tài khoản của bạn.</p>

                <div style="font-size: 24px; font-weight: bold; background: #007bff; color: white; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 4px;">
                    ${otp}
                </div>

                <p style="color: #777; font-size: 14px; margin-top: 10px;">
                    Mã OTP này có hiệu lực trong <strong>3 phút</strong>.
                </p>

                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Nếu bạn không yêu cầu mã OTP này, hãy bỏ qua email này.
                </p>
            </td>
        </tr>
    </table>`,
    });
});
exports.default = sendMail;
