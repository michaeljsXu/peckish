const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const indexRouter = require('./routes/index');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// static
app.use(express.static('public'));

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', indexRouter);
app.use('/api', usersRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});