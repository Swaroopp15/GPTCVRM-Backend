const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");

const getFacilities = async (req, res) => {
  try {
    const data = await db.query(queries.getFacilities);
    // Logic to fetch images
    const facilities = data[0].map((facility, index) => {
      if (!facility.name) return;
      const facilityFolder = path.join(
        process.cwd(),
        "public",
        "uploads",
        "facility",
        facility?.name?.toLowerCase().split(" ").join("_")
      );
      let images = [];
      try {
        if (fs.existsSync(facilityFolder)) {
          const files = fs.readdirSync(facilityFolder);
          images = files.map((file) => {
            return (
              "uploads/" +
              "facility/" +
              facility.name.toLowerCase().split(" ").join("_") +
              "/" +
              file
            );
          });
        }
        return { ...facility, images };
      } catch (error) {
        console.log("Error fetching images for facilities : ", error);
      }
    });
    res.send(facilities);
  } catch (error) {
    console.log("Error in fetching Facilities : ", error);
    res.status(500).send({ message: "Error in fetching Facilities", error });
  }
};

const addFacilities = async (req, res) => {
  try {
    const { name, about } = req.body;
    const images = Array.isArray(req.files?.images)
      ? req.files?.images
      : [req.files?.images];
    // checking if the images are avaiblae
    if (!images) {
      console.log("No images available");
      res.status(400).send({ message: "No images sent" });
      return;
    }
    const data = await db.query(queries.addFacility, [name, about]);
    // Logic to check if the path is availble, if not creating the directory
    const currentPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "facility",
      name.toLowerCase().split(" ").join("_")
    );
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    // adding each image to the server filesystem
    images.forEach((image, index) => {
      const imgExtension = path.extname(image.name);
      const fileName = index + imgExtension;
      const newPath = path.join(currentPath, fileName);
      image.mv(newPath, (err) => {
        if (err) {
          console.log("Failed to upload image for adding new Facility : ", err);
          return res.status(500).send(err);
        }
      });
    });
    res.status(201).send({ message: "Facility added successfully", data });
  } catch (error) {
    console.log("Error in adding new facility : ", error);
    res.status(500).send({ message: "Error in adding Facility", error });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await db.query("SELECT * FROM facilities WHERE id = ?", [
      id,
    ]);
    const data = await db.query(queries.deleteFacility, [id]);
    if (data.affectedRows === 0) {
      return res.send(400).send({ message: "No faculty found with the id" });
    }
    res.status(204).send({ message: "Facility Deleted Successfully" });
    const imagePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "facility",
      facility[0].name.toLowerCase().split(" ").join("_")
    );
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.log("Error in deleting facility : ", error);
    res.status(500).send({ message: "Error in deleting facility", error });
  }
};

const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about, changeImage } = req.body;
    const facility = await db.query("SELECT * FROM facilities WHERE id = ?", [
      id,
    ]);
    const data = await db.query(queries.updateFacility, [
      name || facility[0].name,
      about || facility[0].about,
      id,
    ]);
    if (data.affectedRows === 0) {
      return res.send(400).send({ message: "No faculty found with the id" });
    }
    if (changeImage) {
      const images = req.files.images;
      if (images.length > 0) {
        // logic to delete old images folder
        const imagePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "facility",
          facility[0].name.toLowerCase().split(" ").join("_")
        );
        fs.rmdirSync(imagePath);

        // logic to add new images
        const folderName = name || facility[0].name;
         const currentPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "facility",
      folderName.toLowerCase().split(" ").join("_")
    );
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    // adding each image to the server filesystem
    images.forEach((image, index) => {
      const imgExtension = path.extname(image.name);
      const fileName = index + imgExtension;
      const newPath = path.join(currentPath, fileName);
      image.mv(newPath, (err) => {
        if (err) {
          console.log("Failed to upload image for adding new Facility : ", err);
          return res.status(500).send(err);
        }
      });
    });
      }
    }
    res.status(200).send({ message: "Facility updated successfully", data });
  } catch (error) {
    console.log("Error in Updating Facility : ", error);
    res.status(500).send({ message: "Error in uploading Facility", error });
  }
};
// const updateFacilityImage = async (req, res) => {
//   try {
//     const {id} = req.params;

//   }
// }

module.exports = {
  getFacilities,
  addFacilities,
  deleteFacility,
  updateFacility,
};
