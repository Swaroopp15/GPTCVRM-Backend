const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //getting category and subfolder values for storing images in the format `public/uploads/${category}/${subfolder}`
    const { category, subfolder } = req.body;
    console.log(req.body);
    
    // checking if ther are available
    if (!category || !subfolder) {
      return cb(new Error("Category and subfolder are required"), null);
    }

    // Convert names to lowercase and replace spaces with underscores so it doesn't cause any errors in creating or accessing files
    const categoryName = category.toLowerCase().replace(/ /g, "_");
    const subfolderName = subfolder.toLowerCase().replace(/ /g, "_");

    // creating path
    const uploadPath = path.join(process.cwd(), "public", "uploads", categoryName, subfolderName);

    // checking if directory already exists before storing the file and if not creating it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log("Uploading file to:", uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log("file name :", fileName);
    
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
