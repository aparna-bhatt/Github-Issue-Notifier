require("dotenv").config();
async function Sendmail(username, email, repoName) {
  console.log("in send mail");
    const output = `<p>you have a new issue in the repo ${repoName}</p>`;
    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        user: "aparnabhatt2001@gmail.com",
        pass: "dqhaowjqxkmfltyk",
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <aparnabhatt2001@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "New Issue", // Subject line
      text: `Hello ${username} you have new issue`, // plain text body
      html: output, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("mail!");
  }
  module.exports={Sendmail};