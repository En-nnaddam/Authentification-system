const router = require('express').Router()
const { signUp, verifyOtp } = require('../controllers/user')

router.route('/signup')
    .post(signUp)
router.route('/signup/verify')
    .post(verifyOtp)

module.exports = router