import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (type: String, email: string, otp: string) => {
  const from =
    type == "signup" ? "OTP REGISTER ACCOUNT" : "OTP RESET PASSWORD";

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_KEY,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"${from} 👻👻👻" <${process.env.EMAIL_NAME}>`, // sender address
    to: email, // list of receivers
    subject: `Mã OTP của bạn: ${otp} - Không chia sẻ với bất kỳ ai!`, // Subject line
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
    </table>`, // html body
  });
};

export default sendMail;