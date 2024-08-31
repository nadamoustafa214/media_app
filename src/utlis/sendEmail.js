
import nodemailer from "nodemailer";


 async function sendEmail({to=[],cc,bcc,text,subject,html,attachment}={}) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"sar 1" <${process.env.EMAIL}>`, 
    to, 
    subject,
    text,
    html
  });

  console.log("Message sent: %s", info.messageId);
  
}

export  default sendEmail


