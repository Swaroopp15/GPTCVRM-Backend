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

const addPlacement = async (req, res) => {
  const { name, company, package, year } = req.body;
  try {
      await db.execute(
          queries.addPlacement,
          [name, company, package, year]
      );
      res.json({ message: 'Placement record added successfully' });
  } catch (error) {
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


module.exports = { getAllPlacements, addPlacement, deletePlacement };
