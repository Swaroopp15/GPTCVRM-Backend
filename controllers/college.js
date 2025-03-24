const db = require('../database/db'); // Import database connection

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
        const collegeName = await getInfo('college_name');
        const principalName = await getInfo('principal_name');
        const vision = await getInfo('vision'); // Corrected key name
        const mission = await getInfo('mission');
        const principalMessage = await getInfo('principal_message');
        const contactEmail = await getInfo('contact_email');
        const contactPhone = await getInfo('contact_number');

        res.json({
            college_name: collegeName,
            principal_name: principalName,
            vision,
            mission,
            principal_message: principalMessage,
            contact_email: contactEmail,
            contact_number: contactPhone
        });
    } catch (error) {
        console.error('Error fetching college info:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getCollegeInfo };
