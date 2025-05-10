const deletePreviousImage = (imagePath) => {
  const fs = require('fs');
  const path = require('path');

  // Construct the full path to the image file
  const fullPath = path.join(process.cwd(), "public", "uploads", imagePath);
  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    // Delete the file
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File deleted: ${imagePath}`);
      }
    });
  } else {
    console.log(`File not found: ${imagePath}`);
  }
}

module.exports = deletePreviousImage;