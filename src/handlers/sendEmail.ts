import nodemailer from "nodemailer";

export default async function sendMail(token: string, email: string) {
  var message = {
    from: "support@fdchk.com",
    to: `${email}`,
    subject: "Verification mail",
    text: "Plaintext version of the message",
    html: `<button><a href="http://localhost:3000/user/verify/${token}?t=true">Verify</a></button>`,
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "itsavii19@gmail.com",
      pass: "etpizjzyexsffpro",
    },
  });

  let info = await transporter.sendMail(message);
  return info;
}
