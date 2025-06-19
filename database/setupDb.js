const fs = require('fs');
const path = require('path');
const db = require('./db');

const setupDb = async () => {
  try {
    console.log("Setting up database from dump folder in project root...");
const dumpDir = path.resolve(__dirname, '..', 'dump');
    const files = fs.readdirSync(dumpDir).filter(file => file.endsWith('.sql'));

    for (const file of files) {
      const filePath = path.join(dumpDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Executing: ${file}`);
      await db.query(sql);
      console.log(`Done: ${file}`);
    }

    console.log("All SQL dump files executed successfully.");

  } catch (error) {
    console.error("Error setting up database:", error.message || error);
  }
};

module.exports = setupDb;