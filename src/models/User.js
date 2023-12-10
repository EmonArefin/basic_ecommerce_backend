const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String},
    phoneNumber: {type: String},
}, {versionKey: false, timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;