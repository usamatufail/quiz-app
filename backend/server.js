const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');

const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();
// Connect Data Base Asynchronously
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// API Docs
app.get('/api-docs', function (req, res) {
  res.sendFile(path.join(__dirname, '/api-docs.html'));
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port ${port}`.bgCyan.black)
);
