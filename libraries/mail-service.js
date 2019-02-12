const nodemailer = require('nodemailer');
const logger = require('./log-message');

function sendMail(mailOptions) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.AUTH_MAIL_USER,
      pass: process.env.AUTH_MAIL_PASS
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      logger.log(err, `sendMail from ${data.name}`);
    }
  });
}

exports.sendFeedback = (data) => {

  const mailOptions = {
    from: `${data.email}`,
    to: 'vikasiiitn@gmail.com',
    subject: `Feedback from ${data.name}`,
    html: `<b>Experience: </b><span>${data.experience}</span><br>
            <b>Feedback: </b><span>${data.feedback}</span><br>
            <b>Email: </b><span>${data.email}</span><br>`
  };

  sendMail(mailOptions);

}

exports.sendRecoveryMail = (data) => {
  const mailOptions = {
    from: process.env.AUTH_MAIL_USER,
    to: data.email,
    subject: `Password recovery for todolist.meanpro.com`,
    html: `<h3>Dear User,</h3>
          <b>Verification code: </b>${data.verificationCode}<br>
          <div>Click the below link and reset password by providing your verification code.
          Note that the above code will be expired in <b>1 hour</b></div>
          <a href="http://localhost:4200/#/reset-password">Reset Password</a>
          `
  };

  sendMail(mailOptions);
}
