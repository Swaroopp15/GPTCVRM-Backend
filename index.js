const express = require('express');
const facultyRoutes = require('./routes/faculty');
const departmentRoutes = require('./routes/department');
const placementRoutes = require('./routes/placements');
const resultRoutes = require('./routes/results');
const collegeRoute = require('./routes/college');
const labRouter = require('./routes/labs');

const app = express();

app.use(express.json());

app.use('/college-info', collegeRoute);
app.use('/faculty', facultyRoutes);
app.use('/departments', departmentRoutes);
app.use('/placements', placementRoutes);
app.use('/results', resultRoutes);
app.use('/labs', labRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
