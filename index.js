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
const facilityRoutes = require('./routes/facility');
const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/library');
const ebookRouter = require('./routes/ebook');
const studentRouter = require('./routes/students');
const imagesRouter = require('./routes/images');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
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
app.use(fileUpload());

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
app.use("/facility", facilityRoutes)
app.use("/library", libraryRoutes);
app.use("/ebook", ebookRouter);
app.use('/students', studentRouter);
app.use('/images', imagesRouter);
// Authentication routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
