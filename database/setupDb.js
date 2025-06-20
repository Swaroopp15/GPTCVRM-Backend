const fs = require('fs');
const path = require('path');
const db = require('./db');

const setupDb = async () => {
  try {
    console.log("Setting up database from dump folder in project root...");
    const dumpDir = path.resolve(__dirname, '..', 'dump');

    if (!fs.existsSync(dumpDir)) {
      throw new Error(`Dump directory not found at: ${dumpDir}`);
    }

    const files = fs.readdirSync(dumpDir).filter(file => file.endsWith('.sql'));

    if (files.length === 0) {
      throw new Error(`No .sql files found in: ${dumpDir}`);
    }

    for (const file of files) {
      const filePath = path.join(dumpDir, file);
      
      try {
        console.log(`Reading file: ${file}`);
        const sql = fs.readFileSync(filePath, 'utf8');

        if (!sql.trim()) {
          console.warn(`File is empty: ${file}`);
          continue;
        }

        console.log(`Executing: ${file}`);
        await db.query(sql);
        console.log(`Success: ${file}`);

      } catch (fileError) {
        console.error(`Failed to execute ${file}:`, fileError.message);
        throw fileError;
      }
    }

    console.log("All SQL dump files executed successfully.");
  } catch (error) {
    console.error("Database setup failed:", error.message || error);
    throw error;
  }
};

module.exports = setupDb;