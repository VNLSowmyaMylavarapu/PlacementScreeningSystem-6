const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    position_title: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
    eligibility_criteria: {
        min_cgpa: {
            type: Number,
            required: true,
        },
        required_skills: [{
            type: String,
            required: true,
        }]
    },
    application_deadline: {
        type: Date,
        required: true,
    },
    posted_date: {
        type: Date,
        required: true,
    },
    salary_package: {
        type: Number,
        required: true,
    },
    job_type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship'], // You can modify this based on your needs
        required: true,
    },
    applicants: [{
        type: Number, // Assuming applicant IDs are numbers
    }]
});

// Create the model
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
