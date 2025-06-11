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
    res.json({ years: rows });
  } catch (error) {
    res.status(500).json({ error: "Error fetching placement years" });
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
  const { name, company, package, year, role, pin, depo_code } = req.body;
  try {
    await db.execute(queries.addPlacement, [
      name,
      company,
      package,
      year,
      role,
      pin,
      depo_code
    ]);
    res.json({ message: "Placement record added successfully" });
  } catch (error) {
    console.log(error);
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
    const [rows] = await db.execute("SELECT * FROM placements");
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

  const values = placements.map(p => [
    p.name,
    p.company,
    p.package,
    p.year || new Date().getFullYear(),
    p.role,
    p.pin,
    p.depo_code
  ]);

  try {
    const [result] = await db.query(
      `INSERT INTO placements (name, company, package, year, role, student_pin, depo_code) 
       VALUES ?`, 
      [values]
    );

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
