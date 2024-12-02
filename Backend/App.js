const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./Database/DB_Connect');
const userRouter = require('./routes/userRouter');
const otpRouter = require('./routes/otpRouter');
const assignmentRouter = require('./routes/assignmentRouter');
const subjectRouter = require('./routes/subjectRouter');
const attendanceRouter = require('./routes/attendenceRouter');
const notificrouter = require('./routes/notifiactionsRouter');
const serverRouter = require('./routes/serverRouter');
const resultRouter = require('./routes/resultRouter');


dotenv.config();
ConnectDB();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRouter);
app.use('/api', otpRouter);
app.use('/api', assignmentRouter);
app.use('/api', subjectRouter);
app.use('/api', attendanceRouter);
app.use('/api', notificrouter);
app.use('/api', serverRouter);
app.use('/api', resultRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
