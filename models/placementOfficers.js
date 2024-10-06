const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    officer_id: {
        type: String,
        required: true,
        unique: true, // Ensure that each officer ID is unique
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that each email is unique
        match: [/.+@.+\..+/, 'Please enter a valid email address.'] // Basic email validation
    },
    phone_number: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    }
});

// Create the model
const Officer = mongoose.model('Officer', officerSchema);

module.exports = Officer;
