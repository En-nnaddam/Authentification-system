const bcrypt = require('bcrypt');
const _ = require('lodash')
const axios = require('axios')
const otpGenerator = require('otp-generator')

const { User } = require('../models/user')
const { Otp } = require('../models/otp')

module.exports.signUp = async (req, res) => {
    const user = await User.findOne({ number: req.body.number })
    if (user) return res.status(400).send('User already registred')

    const OTP = otpGenerator.generate(6, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    })
    console.log(OTP)
    const salt = await bcrypt.genSalt(10)
    const OTPhash = await bcrypt.hash(OTP, salt)

    const number = req.body.number
    const otp = new Otp({
        number: number,
        otp: OTPhash
    })

    await otp.save()
    return res.status(200).send('Otp send successfuly!')
}

module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    })
    if (otpHolder.length === 0) return res.status(400).send('You use an expired, OTP')

    const lastOtpFind = otpHolder[otpHolder.length - 1]
    const validUser = await bcrypt.compare(req.body.otp, lastOtpFind.otp)

    if (!validUser) return res.status(400).send("Your OTP was Wrong")

    const user = new User({ number: req.body.number });
    const token = user.generateJWT()
    const result = await user.save()
    await Otp.deleteMany({
        number: req.body.number
    })
    return res.status(200).json({
        message: 'User registred successfuly!',
        token: token,
        data: result
    })
}
