const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/placement_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection error handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Interview Schema
const interviewSchema = new mongoose.Schema({
  interview_id: {
    type: Number,
    required: true,
    unique: true,
  },
  student_id: {
    type: Number,
    required: true,
  },
  job_id: {
    type: Number,
    required: true,
  },
  interview_date: {
    type: Date,
    required: true,
  },
  interview_mode: {
    type: String,
    enum: ['Online', 'In-person'],
    required: true,
  },
  result: {
    type: String,
    enum: ['Pending', 'Passed', 'Failed'],
    required: true,
  },
});

// Create Interview Model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = {
  Interview,
};