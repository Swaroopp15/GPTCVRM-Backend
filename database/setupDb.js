const fs = require('fs');
const path = require('path');
const db = require('./db');
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const setupDb = async () => {
  let retries = 0;


while (retries < MAX_RETRIES) {
    try {
      console.log(`Attempt ${retries + 1} to connect to database...`);
      await db.query('SELECT 1');
      console.log("Database connection successful, proceeding with setup...");
      break;
    } catch (error) {
      retries++;
      if (retries === MAX_RETRIES) {
        throw new Error(`Failed to connect to database after ${MAX_RETRIES} attempts: ${error.message}`);
      }
      console.log(`Database not ready yet, retrying in ${RETRY_DELAY/1000} seconds...`);
      await delay(RETRY_DELAY);
    }
  }


  try {
    console.log("Starting database setup with delay between schema and data...");
    const schemaDir = path.resolve(__dirname, '../database/schema');
    const dataDir = path.resolve(__dirname, '../database/data');

    if (!fs.existsSync(schemaDir)) {
      throw new Error(`Schema directory not found at: ${schemaDir}`);
    }

    console.log("Processing schema files...");
    const schemaFiles = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (schemaFiles.length === 0) {
      throw new Error(`No .sql files found in schema directory: ${schemaDir}`);
    }

    for (const file of schemaFiles) {
      await processSqlFile(schemaDir, file);
    }

    console.log("Waiting 10 seconds before loading data...");
    console.log("Resuming data loading...");

    if (fs.existsSync(dataDir)) {
      console.log("Processing data files...");
      const dataFiles = fs.readdirSync(dataDir)
        .filter(file => file.endsWith('.sql'))
        .sort();

      if (dataFiles.length > 0) {
        for (const file of dataFiles) {
          await processSqlFile(dataDir, file);
        }
      } else {
        console.warn(`No .sql files found in data directory: ${dataDir}`);
      }
    } else {
      console.warn(`Data directory not found at: ${dataDir}`);
    }

    console.log("Database setup completed successfully.");
  } catch (error) {
    console.error("Database setup failed:", error.message || error);
    throw error;
  }
};

async function processSqlFile(directory, file) {
  const filePath = path.join(directory, file);
  try {
    console.log(`Reading file: ${file}`);
    const sql = fs.readFileSync(filePath, 'utf8');

    if (!sql.trim()) {
      console.warn(`File is empty: ${file}`);
      return;
    }

    console.log(`Executing: ${file}`);
    await db.query(sql);
    console.log(`Success: ${file}`);

  } catch (fileError) {
    console.error(`Failed to execute ${file}:`, fileError.message);
    throw fileError;
  }
}

module.exports = setupDb;