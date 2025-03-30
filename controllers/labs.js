const db = require("../database/db");
const queries = require("../database/queries");
const fs = require("fs");
const path = require("path");

const addLabs = async (req, res) => {
  const {
    lab_name,
    description,
    depo_code,
    capacity,
    equipment,
    category,
    subfolder,
  } = req.body;

  const image_name =
    category.toLowerCase().replace(" ", "_") +
    "/" +
    subfolder.toLowerCase().replace(" ", "_");
  try {
    await db.query(queries.addLab, [
      depo_code,
      lab_name,
      description,
      capacity,
      equipment,
      image_name,
    ]);
    res.send({ message: "Posted lab details successfully" });
  } catch (error) {
    res.send({ message: error.message });
    console.error("Error posting lab details:", error);
  }
};

const getLabs = async (req, res) => {
  try {
    const { depo_code } = req.query;
    const results = await db.execute(queries.getLabs, [depo_code]);
    const labsWithImages = results[0].map(lab => {
      const labFolderPath = path.join(process.cwd(), "public", "uploads", lab.image_name);
  
      let imageUrls = [];
      try {
        if (fs.existsSync(labFolderPath)) {
          const files = fs.readdirSync(labFolderPath); // Read all files inside folder
          imageUrls = files.map(file => `uploads/`+ lab.image_name+ "/"+ file);
        }
      } catch (err) {
        console.error(`Error fetching images for ${lab.lab_name}:`, err);
      }

      return { ...lab, images: imageUrls }; // Attach images array to each lab
    });

    res.send(labsWithImages);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.error("Error fetching labs:", error);
  }
};

module.exports = {
  addLabs,
	getLabs
};
