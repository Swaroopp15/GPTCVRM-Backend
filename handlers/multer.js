const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Extract parent directory (category) and subfolder name
    const { category, subfolder } = req.body;
    console.log(req.body);
    
    // Ensure category and subfolder exist
    if (!category || !subfolder) {
      return cb(new Error("Category and subfolder are required"), null);
    }

    // Convert names to lowercase and replace spaces with underscores
    const categoryName = category.toLowerCase().replace(/ /g, "_");
    const subfolderName = subfolder.toLowerCase().replace(/ /g, "_");

    // Construct the dynamic path
    const uploadPath = path.join(process.cwd(), "public", "uploads", categoryName, subfolderName);

    // Ensure the directory exists before storing the file
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log("Uploading file to:", uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log("Generated Filename:", fileName);
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
