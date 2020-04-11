const mongoose = require('mongoose');

const Column = new mongoose.Column({
    nameOfColumn: String,
    listOfTasks: [Object],
})

module.exports = Column;