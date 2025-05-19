const db = require('../database/db');
const queries = require('../database/queries');

// Generic function to fetch data based on key
const getInfo = async (key) => {
    try {
        const [rows] = await db.execute('SELECT info_value FROM college_info WHERE info_key = ?', [key]);
        return rows.length ? rows[0].info_value : null;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return null;
    }
};

// Controller function to handle college info request
const getCollegeInfo = async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM college_info');
        const departments = await db.execute(queries.getAllDepartments);
        const committees = await db.execute(queries.getCommitteeNames);        
        res.json({college: result[0],
            departments: departments[0],
            committees: committees[0]
        })
        
    } catch (error) {
        console.error('Error fetching college info:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addInfo = async (req, res) => {
    try {
        const { info_key, info_value } = req.body;
        const result = await db.execute(queries.addInfo, [info_key, info_value]);
        res.json({ message: 'Info added successfully', result });
    } catch (error) {
        console.error('Error setting college info:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

const setInfo = async (req, res) => {
    try {
        const { info_key, info_value } = req.body;
        const result = await db.execute(queries.setInfo, [info_value, info_key]);
        res.json({ message: 'Info updated successfully', result });
    } catch (error) {
        console.error('Error setting college info:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

module.exports = { getCollegeInfo, setInfo, addInfo };
