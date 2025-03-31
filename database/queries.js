// college info queries
const setInfo = 'UPDATE college_info SET info_value = ? WHERE info_key = ?';
const addInfo = 'INSERT INTO college_info (info_key, info_value) VALUES (?, ?)';


// faculty based queries
const addFaculty = 'INSERT INTO faculty (faculty_name, email, faculty_role, depo_code, image_name) VALUES (?, ?, ?, ?, ?)';
const deleteFaculty = 'DELETE FROM faculty WHERE faculty_id = ?';
const getFacultyById = 'SELECT * FROM faculty WHERE faculty_id = ?' ;
const getAllFaculty = 'SELECT * FROM faculty WHERE depo_code = ?' ;
const updateFaculty = 'UPDATE faculty SET faculty_name = ?, email = ?, faculty_role = ?, depo_code = ?, image_name = ? WHERE faculty_id = ?';

// Admissions queries
const getAdmissions = "SELECT year,JSON_ARRAYAGG(JSON_OBJECT('depo_code', depo_code,'intake', intake,'allocated', allocated )) AS admissions FROM admissions WHERE year BETWEEN YEAR(CURDATE()) - 10 AND YEAR(CURDATE()) GROUP BY year ORDER BY year DESC;"
const addAdmission = "INSERT INTO year (depo_code, year, intake, allocated) VALUES (?, ?, ?, ?)"
// department based queries
const getAllDepartments = "SELECT department_name, depo_code FROM departments";
const getDepartment = "SELECT d.depo_code, d.department_name, d.vision, d.mission,JSON_ARRAYAGG(JSON_OBJECT('faculty_id', f.faculty_id,'faculty_name', f.faculty_name,'email', f.email,'faculty_role', f.faculty_role,'image_name', f.image_name)) AS faculty_members FROM departments d LEFT JOIN faculty f ON d.depo_code = f.depo_code WHERE d.depo_code = ? GROUP BY d.depo_code;";
const addDepartment = 'INSERT INTO departments (depo_code, department_name, vision, mission) VALUES (?, ?, ?, ?)';
const deleteDepartment = 'DELETE FROM departments WHERE depo_code = ?';
const updateDepartment = 'UPDATE departments SET department_name = ?, vision = ?, mission = ?, nba_status = ? WHERE depo_code = ?';

// placement based queries

const addPlacement = 'INSERT INTO placements (name, company, package, year, role, student_pin) VALUES (?, ?, ?, ?, ?, ?)';
const getPlacementYears = 'SELECT DISTINCT year FROM placements ORDER BY year DESC';
const getPlacements = 'SELECT * FROM placements WHERE year = ?';
const getPlacementsByDepo_code = "SELECT * FROM placements WHERE depo_code = ? AND year= ?";
const deletePlacement = 'DELETE FROM placements WHERE id = ?';

// Labs based queries
const addLab = 'INSERT INTO `labs` (`depo_code`, `lab_name`, `description`, `capacity`, `equipment`, `image_name`) VALUES (?, ?, ?, ?, ?, ?)';
const getLabs = 'SELECT * FROM labs WHERE depo_code = ?';
const deleteLab = 'DELETE FROM labs WHERE id = ?';

// Committees queries
const getCommitteeNames = 'SELECT committee_name AS name, id FROM committees';
const getCommitteeInfo = "SELECT c.id,c.committee_name AS committee_name,c.about,JSON_ARRAYAGG(JSON_OBJECT('faculty_id', f.faculty_id,'name', f.faculty_name,'email', f.email,'depo_code', f.depo_code,'role', cm.role)) AS members FROM committees c LEFT JOIN committee_members cm ON c.id = cm.committee_id LEFT JOIN faculty f ON cm.faculty_id = f.faculty_id WHERE c.id = ? GROUP BY c.id;";
const addCommittee = 'INSERT INTO committees (committee_name, about, ) VALUES (?, ?)';
const addCommitteeMember = 'INSERT INTO committee_members (committee_id, faculty_id, role) VALUES (?, ?, ?)';
const deleteCommittee = 'DELETE FROM committes WHERE committee_id = ?';

// Event queries
const addEvent = 'INSERT INTO events (title, description, images, event_date) VALUES (?, ?, ?, ?)';
const getEvents = 'SELECT * FROM events ORDER BY event_date DESC;';
const deleteEvent = 'DELETE FROM events WHERE id = ?';

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
  getPlacementsByDepo_code,
  getPlacementYears,
  getFacultyById,
  updateDepartment,
  updateFaculty,
  addLab,
  getLabs,
  deleteLab,
  getCommitteeNames,
  getCommitteeInfo,
  addCommittee,
  addCommitteeMember,
  deleteCommittee,
  addAdmission,
  getAdmissions,
  setInfo,
  addInfo,
  getEvents,
  addEvent,
  deleteEvent
}