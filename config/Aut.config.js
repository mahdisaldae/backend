module.exports = {
  secret: "bezkoder-secret-key",
  user: "mediumtutorial2021@gmail.com",
  pass: "medium2021t",
};
//sending mail

const url = `http://localhost:3000/api/verify/${verificationToken}`
transporter.sendMail({
  to: email,
  subject: 'Verify Account',
  html: `Click <a href = '${url}'>here</a> to confirm your email.`
})
return res.status(201).send({
  message: `Sent a verification email to ${email}`
});

const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
      },
})
