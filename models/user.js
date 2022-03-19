const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const { type } = require('express/lib/response');

const userSchema = Schema({
    number: {
        type: String,
        required: true
    }
}, { timestamps : true })

userSchema.methods.generateJWT = () => {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    return token
}

module.exports.User = model('user', userSchema)