const tables = require('./sqlTables');
const db = require('./db');

const setupDb = async () => {
  try {
    console.log("Setting up database...");
    console.log("Database : ", process.env.DB_NAME);
    await db.query(tables);
    console.log("database is successfully completed setup");
    
  } catch (error) {
    console.log("Error in setting up database", error);
    
  }
}
setupDb();