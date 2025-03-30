const db = require('../database/db');
const queries = require("../database/queries");

const getAllPlacements = async (req, res) => {
  const {year} = req.params;
    try {
        const [rows] = await db.execute(queries.getPlacements, [year]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching placements' });
    }
};

const getPlacementYears = async (req, res) => {
  try {
      const [rows] = await db.execute(queries.getPlacementYears);
      res.json({years : rows});
  } catch (error) {
      res.status(500).json({ error: 'Error fetching placement years' });
  }
};

const getPlacements = async (req, res) => {
  const { year, depo_code } = req.params;
  try{
    const rows = await db.execute(queries.getPlacementsByDepo_code, [depo_code, year]);
    res.json(rows[0]);
  }
  catch(error) {
    res.status(500).json({ error: 'Error fetching placements' });
    console.log("error at getting departments placements : ", error);
    
  }
}

const addPlacement = async (req, res) => {
  const { name, company, package, year, role, pin } = req.body;
  try {
      await db.execute(
          queries.addPlacement,
          [name, company, package, year, role, pin]
      );
      res.json({ message: 'Placement record added successfully' });
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: 'Error adding placement record' });
  }
};

// Delete a placement record
const deletePlacement = async (req, res) => {
  const { id } = req.params;
  try {
      await db.execute(queries.deletePlacement, [id]);
      res.json({ message: 'Placement record deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Error deleting placement record' });
  }
};


module.exports = { getAllPlacements, addPlacement, deletePlacement, getPlacements, getPlacementYears };
