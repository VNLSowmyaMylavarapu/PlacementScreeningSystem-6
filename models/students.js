const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    degree: { type: String, required: true },
    cgpa: { type: Number, required: true },
    skills: [String], // Array of skills
    resume: { type: String }, // Path to uploaded resume (PDF)
    password: { type: String, required: true } // Hashed password
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

module.exports = { User };