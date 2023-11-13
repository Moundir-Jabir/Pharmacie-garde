const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chaimaetoumy5@gmail.com',
        pass: 'bmnxhjymhvekrlqy'
    }
});

// for forget password
const forgetPassword = (req, user, res) => {
    const mailOptions = {
        from: ' "Verify your email" chaimaetoumy5@gmail.com',
        to: user.email,
        subject: 'Account Activation link',
        html: `<h4> please click on given link to reset your password </h4>
            <a href="http://${req.headers.host}/api/auth/forgetPassword/${user.eToken}" >click to reset password</a>`
    };
    try {
        transporter.sendMail(mailOptions)
        res.err = 'the link to reset password is sent to your gmail account'
    } catch (error) {
        res.err = error.err || 'error'
    }


};

module.exports = { forgetPassword }
