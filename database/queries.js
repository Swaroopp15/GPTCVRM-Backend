// faculty based queries
const addFaculty = 'INSERT INTO faculty (faculty_name, email, faculty_role, depo_code, image_name) VALUES (?, ?, ?, ?, ?)';
const deleteFaculty = 'DELETE FROM faculty WHERE faculty_id = ?';
const getFacultyById = 'SELECT * FROM faculty WHERE faculty_id = ?' ;
const getAllFaculty = 'SELECT * FROM faculty';
const updateFaculty = 'UPDATE faculty SET faculty_name = ?, email = ?, faculty_role = ?, depo_code = ?, image_name = ? WHERE faculty_id = ?';

// department based queries
const getAllDepartments = "SELECT department_name FROM departments";
const getDepartment = "SELECT * FROM departments WHERE depo_code = ?";
const addDepartment = 'INSERT INTO departments (depo_code, department_name, vision, mission) VALUES (?, ?, ?, ?)';
const deleteDepartment = 'DELETE FROM departments WHERE depo_code = ?';
const updateDepartment = 'UPDATE departments SET department_name = ?, vision = ?, mission = ?, nba_status = ? WHERE depo_code = ?';

// placement based queries

const addPlacement = 'INSERT INTO placements (name, company, package, year) VALUES (?, ?, ?, ?)';
const getPlacements = 'SELECT * FROM placements WHERE year = ?';
const deletePlacement = 'DELETE FROM placements WHERE id = ?';

// Labs based queries

const addLab = 'INSERT INTO `gpt_cvrm`.`labs` (`depo_code`, `lab_name`, `description`, `capacity`, `equipment`, `image_name`) VALUES (?, ?, ?, ?, ?, ?)';
const getLabs = 'SELECT * FROM labs WHERE depo_code = ?';
const deleteLab = 'DELETE FROM labs WHERE id = ?';

module.exports = {
  addDepartment,
  addFaculty,
  addPlacement,
  deleteDepartment,
  deleteFaculty,
  deletePlacement,
  getAllDepartments,
  getAllFaculty,
  getDepartment,
  getPlacements,
  getFacultyById,
  updateDepartment,
  updateFaculty
}