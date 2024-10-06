const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const placementRoutes = require('./routes/placement'); // Adjust the path as necessary

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/placementScreeningSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON requests

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded resumes from the uploads directory

// Set the view engine to Pug (if you're using Pug for templates)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Set views directory for Pug templates

// Use the defined routes for placement system
app.use('/', placementRoutes);

// Root Route (Optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Placement Screening System!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Fixed the template literal
});
// const express = require('express')
// const app = express()

// const path = require('path')
// const url = require('url')

// //middleware - static files like css, js, img etc...
// app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res)=>{

//   //read file
//   const pathName = url.parse(req.url, true).pathname
//   let filePath = path.join(__dirname, 'views', pathName)

//   if(pathName === '/')
//     filePath = path.join(__dirname, 'views', 'index.html')

//   res.sendFile(filePath)
  
// })


// app.listen(9244, ()=>{
//   console.log("Server is running @ http://localhost:9244")
// })