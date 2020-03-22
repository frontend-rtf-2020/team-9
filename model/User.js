const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    email: String
});

module.exports = userSchema;