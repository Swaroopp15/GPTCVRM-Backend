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
const addAdmission = "INSERT INTO admissions (depo_code, year, intake, allocated) VALUES (?, ?, ?, ?)"
// department based queries
const getAllDepartments = "SELECT department_name, depo_code FROM departments";
const getDepartment = "SELECT d.depo_code, d.department_name, d.vision, d.mission,JSON_ARRAYAGG(JSON_OBJECT('faculty_id', f.faculty_id,'faculty_name', f.faculty_name,'email', f.email,'faculty_role', f.faculty_role,'image_name', f.image_name)) AS faculty_members FROM departments d LEFT JOIN faculty f ON d.depo_code = f.depo_code WHERE d.depo_code = ? GROUP BY d.depo_code;";
const addDepartment = 'INSERT INTO departments (depo_code, department_name, vision, mission) VALUES (?, ?, ?, ?)';
const deleteDepartment = 'DELETE FROM departments WHERE depo_code = ?';
const updateDepartment = "UPDATE departments SET  department_name = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE department_name END,  vision = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE vision END,  mission = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE mission END WHERE depo_code = ?;";

// placement based queries

const addPlacement = 'INSERT INTO placements (name, company, package, year, role, student_pin, depo_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
const getPlacementYears = 'SELECT DISTINCT year FROM placements WHERE depo_code = ? ORDER BY year DESC';
const getPlacements = 'SELECT * FROM placements WHERE year = ?';
const getPlacementsByDepo_code = "SELECT * FROM placements WHERE depo_code = ? AND year= ?";
const deletePlacement = 'DELETE FROM placements WHERE id = ?';

// Labs based queries
const addLab = 'INSERT INTO `labs` (`depo_code`, `lab_name`, `description`, `capacity`, `equipment`, `image_name`) VALUES (?, ?, ?, ?, ?, ?)';
const getLabs = 'SELECT * FROM labs WHERE depo_code = ?';
const getLabById = 'SELECT * FROM labs WHERE id = ?';
const deleteLab = 'DELETE FROM labs WHERE id = ?';
const updateLab = 'UPDATE labs SET lab_name = ?, description = ?, capacity = ?, equipment = ?, depo_code = ?, image_name = ? WHERE id = ?';

// Committees queries
const getCommitteeNames = 'SELECT committee_name AS name, id FROM committees';
const getCommitteeInfo = "SELECT c.id,c.committee_name AS committee_name,c.about,JSON_ARRAYAGG(JSON_OBJECT('faculty_id', f.faculty_id,'name', f.faculty_name,'email', f.email,'number', f.number,'image_name', f.image_name ,'depo_code', f.depo_code,'role', cm.role)) AS members FROM committees c LEFT JOIN committee_members cm ON c.id = cm.committee_id LEFT JOIN faculty f ON cm.faculty_id = f.faculty_id WHERE c.id = ? GROUP BY c.id;";
const getAvailableFaculty = "SELECT * FROM faculty where faculty.faculty_id NOT IN (SELECT faculty_id FROM committee_members);"
const addCommittee = 'INSERT INTO committees (committee_name, about) VALUES (?, ?)';
const addCommitteeMember = 'INSERT INTO committee_members (committee_id, faculty_id, role) VALUES (?, ?, ?)';
const deleteCommittee = 'DELETE FROM committees WHERE id = ?';
const updateCommittee = "UPDATE committees SET committee_name = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE committee_name END, about = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE about END WHERE id = ?";

// Event queries
const addEvent = 'INSERT INTO events (title, description, images, event_date) VALUES (?, ?, ?, ?)';
const getEvents = 'SELECT * FROM events ORDER BY event_date DESC;';
const deleteEvent = 'DELETE FROM events WHERE id = ?';
const getEventById = "SELECT * FROM events WHERE id = ?";
const updateEvent = "UPDATE events SET title = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE title END, description = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE description END, images = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE images END, event_date = CASE WHEN ? IS NOT NULL AND ? != '' THEN ? ELSE event_date END WHERE id = ?;";

//notifications queries
const getNotifications = 'SELECT * FROM notifications ORDER BY date DESC';
const addNotification = 'INSERT INTO notifications (title, date, isLink, link) VALUES (?, ?, ?, ?)';
const deleteNotification = 'DELETE FROM notifications WHERE id = ?';
const getNotificationById = 'SELECT * FROM notifications WHERE id = ?';
const updateNotification = 'UPDATE notifications SET title = ?, date = ?, isLink = ?, link = ? WHERE id = ?';

// Authentication queries
const getUser = "SELECT * FROM users WHERE email = ?";
const addUser = "INSERT INTO users (email, password, name, role) VALUES(?, ?, ?, ?)";


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
  getLabById,
  deleteLab,
  updateLab,
  getCommitteeNames,
  getCommitteeInfo,
  addCommittee,
  addCommitteeMember,
  getAvailableFaculty,
  deleteCommittee,
  updateCommittee,
  addAdmission,
  getAdmissions,
  setInfo,
  addInfo,
  getEvents,
  addEvent,
  deleteEvent,
  getEventById,
  updateEvent,
  addNotification,
  getNotifications,
  deleteNotification,
  getNotificationById,
  updateNotification,
  getUser,
  addUser,
}