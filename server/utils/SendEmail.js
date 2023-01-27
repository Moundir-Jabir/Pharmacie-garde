const nodemailer = require("nodemailer")

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass
    }
})

const resetPasswordEmail = (name, email, token) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "RESET PASSWORD",
        html: `<h1>RESET PASSWORD</h1>
            <h2>Hello ${name}</h2> 
            <p>plaise n'oblier pas le code the next time</p>
            <a href=http://localhost:5173/resetpassword/${token}> Reset pasword</a>
            </div>`,
    }).catch(err => console.log(err));
}

module.exports = resetPasswordEmail