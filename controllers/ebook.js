const fileUpload = require("express-fileupload");
const db = require("../database/db");
const queries = require("../database/queries");
const path = require('path');
const fs = require("fs");

const addEbook = async (req, res) => {
  const { title, author, link } = req.body;
  try {
    if (link && !req.files?.ebook) {

      await db.execute(queries.addEbook, [
        title, author, link
      ]);
      return res.status(201).json({ message: "Ebook added successfully" });
    }
    
    const ebookPath = path.join(process.cwd(), "public", "uploads", "ebooks");
    // Logic to check if the path is available, if not creating the directory
    if (!fs.existsSync(ebookPath)) {
      fs.mkdirSync(ebookPath, { recursive: true });
    }
    const ebookPathName = path.join(ebookPath, req.files.ebook.name);
    req.files.ebook.mv(ebookPathName,async (err) => {
      if (err) {
        console.error("Failed to upload ebook file:", err);
        return res.status(500).json({ error: "Failed to upload ebook file" });
      }
      else {
        const ebookFilePath = path.join('uploads', 'ebooks', req.files.ebook.name);
        await db.execute(queries.addEbook, [
        title, author, ebookFilePath
      ]);
      }
    });
    res.status(201).json({ message: "Ebook added successfully" });
  } catch (error) {
    console.error("Error adding ebook:", error);
    res.status(500).json({ error: "Error adding ebook" });
  }
}

const deleteEbook = async (req, res) => {
  const { id } = req.params;
  try {
    const [ebook] = await db.execute(queries.getEbookById, [id]);
    if (!ebook) {
      return res.status(404).json({ error: "Ebook not found" });
    }
    const ebookPath = ebook.ebook_path;
    await db.execute(queries.deleteEbook, [id]);
    if (ebookPath && fs.existsSync(ebookPath)) {
      fs.unlinkSync(ebookPath);
    }
    res.status(200).json({ message: "Ebook deleted successfully" });
  }
  catch (error) {
    console.error("Error deleting ebook:", error);
    res.status(500).json({ error: "Error deleting ebook" });
  }
}

const updateEbook = async (req, res) => {
  const { id, title, author, link } = req.body;
  try {
    if (link && !req.files.ebook) {
      await db.execute(queries.updateEbook, [
        title, author, link, id
      ]);
    }
    
    const ebookPath = path.join(process.cwd(), "public", "uploads", "ebooks");
    // Logic to check if the path is available, if not creating the directory
    if (!fs.existsSync(ebookPath)) {
      fs.mkdirSync(ebookPath, { recursive: true });
    }
    const ebookPathName = path.join(ebookPath, req.files.ebook_file.name);
    req.files.ebook.mv(ebookPathName, async (err) => {
      if (err) {
        console.error("Failed to upload ebook file:", err);
        return res.status(500).json({ error: "Failed to upload ebook file" });
      }
      else {
        await db.execute(queries.updateEbook, [
          title, author, ebookPathName, id
        ]);
      }
    });
    res.status(200).json({ message: "Ebook updated successfully" });
  } catch (error) {
    console.error("Error updating ebook:", error);
    res.status(500).json({ error: "Error updating ebook" });
  }
}

module.exports = {
  addEbook,
  deleteEbook,
  updateEbook
};