const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");
const fileSaver = require("../Utilities/fileSaver");

const getImages = async (req, res) => {
  try {
    const [rows] = await db.execute(queries.getImages);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching images", error });
  }
}

const addImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const image = req.files.image;
    let { imageName } = req.body;

    if (!imageName) {
      return res.status(400).json({ message: "Image name is required" });
    }

    const sanitizedImageName = imageName.split(" ").join("_");
    const savedPath = await fileSaver(image, sanitizedImageName, "images");

    await db.execute(queries.addImage, [sanitizedImageName, savedPath]);

    res.json({
      message: "Image uploaded successfully",
      imageName: sanitizedImageName,
      imagePath: savedPath,
    });
  } catch (error) {
    console.error("Error in addImage:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { imageName } = req.params;
    const [image] = await db.execute(queries.getImageByName, [imageName]);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = path.join(__dirname, "..", "public", image[0].image_path);

    // Delete the image file from the server
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the image info from the database
    await db.execute(queries.deleteImage, [imageName]);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error in deleteImage:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

const updateImage = async (req, res) => {
  try {
    const { imageName } = req.body;

    // Check if the image exists
    const [image] = await db.execute(queries.getImageByName, [imageName.split(" ").join("_")]);
    if (!image.length) {
      return res.status(404).json({ message: "Image not found" });
    }
if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    if (fs.existsSync(image[0].image_path)) {
      // Delete the old image file
      fs.unlinkSync(path.join(__dirname, "..", "public", image[0].image_path));
    }
    const newImage = req.files.image;
    let newImageName = imageName.split(" ").join("_");
    newImageName = newImageName + path.extname(newImage.name);
    const uploadPath = path.join(__dirname, "..", "public", "uploads", "images", newImageName);
    newImage.mv(uploadPath, (err) =>
      {
        if (err) {
          return res.status(500).json({ message: "Error uploading image", error: err });
        }
      }
    );
    // Update the image name in the database
    await db.execute(queries.updateImage, ["uploads/images/" + newImageName, imageName]);
    res.json({ message: "Image updated successfully" });
  } catch (error) {
    console.error("Error in updateImage:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

module.exports = {
  getImages,
  addImage,
  deleteImage,
  updateImage
}