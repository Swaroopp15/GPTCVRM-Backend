const db = require('../database/db');
const queries = require('../database/queries');
const getBulkUrls = require('../Utilities/getUrlsBulk');


const getLibrary = async (req, res) => {
  try {
    const overview = await db.query(queries.getOverview);
    const books = await db.query(queries.getBooks);
    const journals = await db.query(queries.getJournals);
    const ebooks = await db.query("SELECT * FROM ebooks");
    const ebooksWithImages = await getBulkUrls(ebooks[0], 'link'); 
    const data = {
      library : overview[0],
      books: books[0],
      journals: journals[0],
      ebooks : ebooksWithImages
    }
    res.json(data);
  } catch (error) {
    console.log("Error in fetching library details : ", error);
    res.status(500).send({message: "Error in fetching library details", error})
  }
}

const addLibrary = async (req, res) => {
  try {
    const {title, author, type, volume} = req.body;
    const data = await db.query(queries.addLibraryItem, [title, author, volume, type]);
    res.send({message: "Book Added Successful"})
  } catch (error) {
    console.log("Error in adding new library item : ", error);
    res.status(500).send({message: "error in adding new library item", error});    
  }
}

const deleteLibrary = async (req, res) => {
  try {
    const {id} = req.params;
    const data = await db.query(queries.deleteItem, [id]);
    res.send({message: "Book Deleted Successful"})
  } catch (error) {
    console.log("Error in adding new library item : ", error);
    res.status(500).send({message: "error in adding new library item", error});    
  }
}

const updateBook = async (req, res) => {
  try {
    const {id, title, author, volume} = req.body;
    const data = await db.query("UPDATE `library` SET title = ?, author = ?, volumes = ? WHERE id = ?", [title, author, volume, id]);
    res.send({message: "Book Updated Successful"})
  } catch (error) {
    console.log("Error in updating library item : ", error);
    res.status(500).send({message: "error in updating library item", error});    
  }
}

module.exports = {
  getLibrary,
  addLibrary,
  deleteLibrary,
  updateBook
}