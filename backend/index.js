require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbconnect = require('./config/database'); // Adjust path as necessary

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Routes
const userRouter = require('./routes/userroute');
const uploadRouter = require('./routes/FileUpload');

app.use('/api/v1', userRouter);
app.use('/api/v1/upload', uploadRouter);

// Connect to the database
dbconnect(); // Make sure this function is correctly set up to connect to your MongoDB

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
