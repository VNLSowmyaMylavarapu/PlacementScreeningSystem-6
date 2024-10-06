const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    test_id: {
        type: String,
        required: true,
    },
    student_id: {
        type: String,
        required: true,
    },
    job_id: {
        type: String,
        required: true,
    },
    test_date: {
        type: Date,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0, // Assuming score cannot be negative
        max: 100 // Assuming a maximum score of 100
    },
    result: {
        type: String,
        enum: ['Qualified', 'Not Qualified'], // Restricting result values
        required: true,
    }
});

// Create the model
const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
