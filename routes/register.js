const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const { Student } = require('../models/db'); // Assuming you're using a Student model for registration

// Configure multer for file uploads (resume)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes'); // Directory where resumes will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/; // Accept only PDF files
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only PDF files are allowed!');
        }
    }
});

// POST route for handling student registration
router.post('/submit_registration', upload.single('resume'), async (req, res) => {
    const { name, ID, email, phone, department, degree, cgpa, skills } = req.body;

    try {
        // Check if a student with the same ID already exists
        const studentExists = await Student.findOne({ studentId: ID });
        if (studentExists) {
            return res.status(400).send('Student with this ID already exists');
        }

        // Create a new student object
        const newStudent = new Student({
            name,
            studentId: ID,
            email,
            phone,
            department,
            degree,
            cgpa,
            skills: skills.split(','), // Convert comma-separated skills into an array
            resume: req.file ? req.file.path : null // Store resume path if uploaded
        });

        // Save the student to the database
        await newStudent.save();

        // Respond with success
        res.status(200).send('Registration successful!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;