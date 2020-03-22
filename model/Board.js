const mongoose = require('mongoose');

const Board = new mongoose.Board({
    creatorId: Object,
    descriptionOfBoard: String,
    participants: [Object],
    nameOfBoard: String,
    columns: Object
});

module.exports = Board;