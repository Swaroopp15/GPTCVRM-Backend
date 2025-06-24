const fileUpload = require("express-fileupload");
const db = require("../database/db");
const queries = require("../database/queries");
const path = require('path');
const fs = require("fs");
const uploadObject = require("../minio/uploadFiles");

const addEbook = async (req, res) => {
  const { title, author, link } = req.body;
  try {
    if (link && !req.files?.ebook) {
      await db.execute(queries.addEbook, [
        title, author, link
      ]);
      return res.status(201).json({ message: "Ebook added successfully" });
    }
    
    if (!req.files?.ebook) {
      return res.status(400).json({ error: "No ebook file provided" });
    }

    const tempPath = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }

    const tempFilePath = path.join(tempPath, req.files.ebook.name);
    await req.files.ebook.mv(tempFilePath);

    try {
      const bucketName = "gptcvrm";
      await uploadObject(tempFilePath, "ebooks", bucketName);
      
      const ebookPath = `${bucketName}/ebooks/${req.files.ebook.name}`;
      
      await db.execute(queries.addEbook, [
        title, author, ebookPath
      ]);
      
      fs.unlinkSync(tempFilePath);
      
      return res.status(201).json({ message: "Ebook added successfully" });
    } catch (uploadError) {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      throw uploadError;
    }
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
    
    await db.execute(queries.deleteEbook, [id]);
    
    res.status(200).json({ message: "Ebook deleted successfully" });
  } catch (error) {
    console.error("Error deleting ebook:", error);
    res.status(500).json({ error: "Error deleting ebook" });
  }
}

const updateEbook = async (req, res) => {
  const { id, title, author, link } = req.body;
  try {
    if (link && !req.files?.ebook) {
      await db.execute(queries.updateEbook, [
        title, author, link, id
      ]);
      return res.status(200).json({ message: "Ebook updated successfully" });
    }
    
    if (!req.files?.ebook) {
      return res.status(400).json({ error: "No ebook file provided" });
    }

    const tempPath = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }

    const tempFilePath = path.join(tempPath, req.files.ebook.name);
    await req.files.ebook.mv(tempFilePath);

    try {
      const bucketName = "gptcvrm";
      await uploadObject(tempFilePath, "ebooks", bucketName);
      
      const ebookPath = `${bucketName}/ebooks/${req.files.ebook.name}`;
      
      await db.execute(queries.updateEbook, [
        title, author, ebookPath, id
      ]);
      
      fs.unlinkSync(tempFilePath);
      
      return res.status(200).json({ message: "Ebook updated successfully" });
    } catch (uploadError) {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      throw uploadError;
    }
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