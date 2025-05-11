const express = require('express');
const cors = require('cors');
const path = require('path');
const facultyRoutes = require('./routes/faculty');
const departmentRoutes = require('./routes/department');
const placementRoutes = require('./routes/placements');
const resultRoutes = require('./routes/results');
const collegeRoute = require('./routes/college');
const labRouter = require('./routes/labs');
const committeeRouter = require('./routes/committees');
const admissionsRouter = require('./routes/admissions');
const eventRouter = require('./routes/events');
const notificationRouter = require('./routes/notifications');
const authRoutes = require('./routes/auth');
const session = require('express-session');

const app = express();
app.use(cors({
  origin: [['http://localhost:5173']],
}))
app.use(session({
  secret: process.env.SESSION_SECRET || 'gpt_cvrm',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true
  }
}));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/college-info', collegeRoute);
app.use('/faculty', facultyRoutes);
app.use('/departments', departmentRoutes);
app.use('/placements', placementRoutes);
app.use('/results', resultRoutes);
app.use('/labs', labRouter);
app.use('/committee', committeeRouter);
app.use('/admissions', admissionsRouter);
app.use("/events", eventRouter);
app.use("/notifications", notificationRouter);
// Authentication routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
