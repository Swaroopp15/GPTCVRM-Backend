const db = require("../database/db");
const queries = require("../database/queries");

const getAllPlacements = async (req, res) => {
  const { year } = req.params;
  try {
    const [rows] = await db.execute(queries.getPlacements, [year]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching placements" });
  }
};

const getPlacementYears = async (req, res) => {
  try {
    const depo_code = req.query.depo_code;
    if (!depo_code) {
      return res.status(400).json({ error: "Depo code is required" });
    }
    const [rows] = await db.execute(queries.getPlacementYears, [depo_code]);
    const years = rows.map((year) => year.placement_year);
    res.json(years);
  } catch (error) {
    console.log("Error fetching placement years:", error);
    res.status(500).json({ message: "Error fetching placement years", error });
  }
};

const getPlacements = async (req, res) => {
  const { year, depo_code } = req.params;
  try {
    const rows = await db.execute(queries.getPlacementsByDepo_code, [
      depo_code,
      year,
    ]);
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching placements" });
    console.log("error at getting departments placements : ", error);
  }
};

const addPlacement = async (req, res) => {
  const { company, package, placement_year, role, pin } = req.body;
  try {
    const [student] = await db.execute("SELECT id FROM students WHERE pin = ?", [pin]);
    if (student.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(student);
    
    await db.execute(queries.addPlacement, [
      student[0].id,
      company,
      package,
      placement_year,
      role,
    ]);
    res.json({ message: "Placement record added successfully" });
  } catch (error) {
    console.log("error in adding placement record : ",error);
    res.status(500).json({ error: "Error adding placement record" });
  }
};

// Delete a placement record
const deletePlacement = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute(queries.deletePlacement, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Placement record not found" });
    }
    res.json({ message: "Placement record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting placement record" });
  }
};

const getAllPlacement = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT p.*, s.* FROM placements p   JOIN students s ON s.id = p.student_id");
    res.json(rows);
    // console.log(rows);
  } catch (error) {
    console.error("Error fetching all placements:", error);
    res.status(500).json({ error: "Error fetching all placements" });
  }

};

const addPlacementsBulk = async (req, res) => {
  const placements = req.body;

  if (!Array.isArray(placements) || placements.length === 0) {
    return res.status(400).json({ error: "No placement data provided." });
  }


  try {
    const [result] = placements.map(async placement => {
      try {
        // console.log("Placement data:", placement);
        
        const [student] = await db.execute("SELECT id FROM students WHERE pin = ?", [placement.pin]);
        if (student.length === 0) {
          console.log(`Student with pin ${placement.pin} not found`);
      }
      // console.log(student);
      
      await db.query(queries.addPlacement, [student[0].id, placement.company, placement.package, placement.year, placement.role]);  
    } catch (error) {
      console.log("Error processing placement data:", error);
      return;
    }
    })
    res.json({ message: "Bulk placements uploaded", insertedCount: result.affectedRows });
  } catch (error) {
    console.error("Bulk insert error:", error);
    res.status(500).json({ error: "Error uploading bulk placements" });
  }
};


module.exports = {
  getAllPlacements,
  addPlacement,
  deletePlacement,
  getPlacements,
  getPlacementYears,
  getAllPlacement,
  addPlacementsBulk,
};
