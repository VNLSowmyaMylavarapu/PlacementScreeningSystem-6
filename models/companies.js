const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    company_email: {
        type: String,
        required: true,
        unique: true, // Ensures that each email is unique
        match: [/.+@.+\..+/, 'Please enter a valid email address.'] // Basic email validation
    },
    contact_number: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
        match: [/^(http|https):\/\/[^ "]+$/, 'Please enter a valid URL.'] // Basic URL validation
    },
    address: {
        type: String,
        required: true,
    },
    industry_type: {
        type: String,
        required: true,
    },
    posted_positions: [{
        type: String, // Assuming posted positions are job IDs
    }],
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    }
});

// Create the model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
