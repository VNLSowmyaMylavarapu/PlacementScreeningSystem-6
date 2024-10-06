const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const { User } = require('../models/db'); // Assuming you have a User model for both login and registration

// Configure multer for file uploads (for resume in registration)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes'); // Directory where resumes will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with template literals
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

// =============================
// REGISTER ROUTE
// =============================
router.post('/submit_register', upload.single('resume'), async (req, res) => {
    const { name, ID, email, phone, department, degree, cgpa, skills, password } = req.body;

    try {
        // Check if user with the same ID or email already exists
        const userExists = await User.findOne({ $or: [{ studentId: ID }, { email }] });
        if (userExists) {
            return res.status(400).send('User with this ID or Email already exists.');
        }

        // Hash the password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new User({
            name,
            studentId: ID,
            email,
            phone,
            department,
            degree,
            cgpa,
            skills: skills.split(','), // Convert comma-separated skills into an array
            resume: req.file ? req.file.path : null, // Store resume path if uploaded
            password: hashedPassword // Store the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success
        res.status(200).send('Registration successful!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// =============================
// LOGIN ROUTE
// =============================
router.post('/submit_login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists with the provided username (ID or email)
        const user = await User.findOne({ $or: [{ studentId: username }, { email: username }] });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // On successful login, respond with a success message or set up a session
        res.status(200).send('Login successful!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;