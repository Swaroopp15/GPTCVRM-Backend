const db = require("../database/db");
const queries = require("../database/queries");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const {email, password, name, role} = req.body;
    // Check if user already exists
    const existingUser = await db.query(queries.getUser, [email]);
    if (existingUser[[0].length > 0]) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    // Insert new user into the database
    const newUser = await db.query(queries.addUser, [email, hashedPassword, name, role]);
    if (newUser[0].affectedRows > 0) {
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to register user' });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    // Check if user exists   
    const [user] = await db.query(queries.getUser, [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.session.user = {
      id: user[0].id,
      email: user[0].email
    };
    res.status(200).json({ message: 'Login successful', user: { id: user[0].id, email: user[0].email } });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const isLoggedIn = async (req, res) => { 
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(401).json({ loggedIn: false });
  }
}

const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
}

module.exports = {
  register,
  login,
  isLoggedIn,
  logout
};