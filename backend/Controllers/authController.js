const admin = require('../Models/authModel')
const bycrpt = require('bcryptjs')
let ls = require('local-storage');
const { forgetPassword } = require('../Utils/sendEmail')
const generateToken = require('../Utils/generateToken');
const jwt = require('jsonwebtoken')

// method : post
// url : api/auth/login
// acces : private

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).send("Please add All fields")
    }
    try {
        const admin_ = await admin.findOne({ email })
        if (admin_) {
            const isMatch = await bycrpt.compare(password, admin_.password)
            if (isMatch) {
                let token = generateToken(admin_.id, admin_.email, admin_.username)
                ls.set('token', token)
                res.status(200).json({
                    _id: admin_.id,
                    username: admin_.username,
                    email: admin_.email,
                    password: admin_.password,
                    token: token
                })
            }
            else {
                res.status(400).send("password is incorrect")
            }
        }
        else {
            res.status(404).send("user not found")
        }
    }
    catch (error) {
        console.log(error)
    }
}

// method : post
// url : api/auth/forgotpassword
// acces : private

const forget_password = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400).send("email is required")
    }
    try {
        const admin_ = await admin.findOne({ email })
        if (admin_) {
            await forgetPassword(req, admin_, res)
            res.status(200).json({
                _id: admin_.id,
                email: admin_.email,
                etoken: jwt.sign({ _id: admin_.id }, process.env.JWT_SECRET, { expiresIn: '10m' }),
                msg: res.err
            })
        }
        else {
            res.status(404).send("user not found")
        }
    } catch (error) {
        console.log(error)
    }
}

// method : post
// url : api/auth/resetpassword
// acces : private

const resetpassword = async (req, res) => {
    const password = req.body.password
    let token = req.params.token
    const salt = await bycrpt.genSalt(10)

    if (!password) {
        res.status(400).send("password is required")
    }
    const admin_ = await admin.findOne({ eToken: token })
    if (admin_ && admin_.isReset === true) {
        admin_.password = await bycrpt.hash(password, salt)
        res.status(200).send("password is reset")
        await admin_.save()
    }
    else {
        res.status(400).send("password is not reset")
    }
}

//method : get
//url : api/auth/logout
//acces : private

const logout = async (req, res) => {
    let token = ls.get('token')
    if (token) {
        ls.remove('token')
        res.status(200).send("logout successfully")
    }
}



// method : get
// url : api/auth/forgetPassword/:token
// acces : private
// send mail to user for reset password
const verify_email_rest = async (req, res) => {
    try {
        let token = req.params.token
        const admin_ = await admin.findOne({ eToken: token })
        if (admin_) {
            admin_.isReset = true
            await admin_.save()
            res.redirect(`http://localhost:3000/resetpassword/${token}`)
        }
        else {
            res.send("password is not verified")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    login,
    forget_password,
    verify_email_rest,
    resetpassword,
    logout
}
