const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./Database/DB_Connect');
const userRouter = require('./routes/userRouter');
const otpRouter = require('./routes/otpRouter');
const assignmentRouter = require('./routes/assignmentRouter');
const attendanceRouter = require('./routes/attendenceRouter');
const notificrouter = require('./routes/notifiactionsRouter');
const resultRouter = require('./routes/resultRouter');
const helpMsgRouter = require('./routes/helpMsgRouter');
const AiRouter = require('./routes/serverRouter');


dotenv.config();
ConnectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  return res.send("Welcome");
})

// Routes
app.use('/api', userRouter);
app.use('/api', otpRouter);
app.use('/api', assignmentRouter);
app.use('/api', attendanceRouter);
app.use('/api', notificrouter);
app.use('/api', AiRouter);
app.use('/api', resultRouter);
app.use('/api', helpMsgRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
