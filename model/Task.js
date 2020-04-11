const mongoose = require('mongoose');

const Task = new mongoose.Task({
    title: String,
    UserId: Object,
    descriptionOfBoard: String,
    dateOfAdd: Date,
    dateOfEnd: Date,
    status: Boolean
});

module.exports = Task;