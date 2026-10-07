const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Student", studentSchema);