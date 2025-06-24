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
    conducted_labs,
    specifications,
    budget,
  } = req.body;

  const image_name = "labs/" + lab_name.toLowerCase().split(" ").join("_");
  try {
    // const images = req.files.lab_images;
    const imagePath = path.join(process.cwd(), "public", "uploads", image_name);
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
    }
    const eventImages = Array.isArray(req.files.lab_images)
      ? req.files.lab_images
      : [req.files.lab_images];
    eventImages.forEach((image) => {
      const pathh = path.join(imagePath, image.name);
      image.mv(pathh, (err) => {
        if (!err) return;
        console.log("Error in saving event image : ", err);
      });
    });

    await db.query(queries.addLab, [
      depo_code,
      lab_name,
      description,
      capacity,
      equipment,
      conducted_labs,
      specifications,
      budget,
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
    const labsWithImages = results[0].map((lab) => {
      const labFolderPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        lab.image_name
      );

      let imageUrls = [];
      try {
        if (fs.existsSync(labFolderPath)) {
          const files = fs.readdirSync(labFolderPath); // Read all files inside folder
          imageUrls = files.map(
            (file) => `uploads/` + lab.image_name + "/" + file
          );
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

const deleteLab = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.deleteLab, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lab not found" });
    }
    res.json({ message: "Lab deleted successfully" });
  } catch (error) {
    console.log("Error at deleting lab", error);
    res.status(500).json({ message: "Error at deleting lab", error });
  }
};
const updateLab = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      lab_name,
      description,
      depo_code,
      capacity,
      equipment,
    } = req.body;
    const [lab] = await db.query(queries.getLabById, [id]);
    const image_name = lab[0].image_name;

    console.log("image : ",lab);
    
    
    if (lab.length === 0) {
      return res.status(404).json({ message: "Lab not found" });
    }
    // if(fs.existsSync(lab))
    const result = await db.query(queries.updateLab, [
      lab_name || lab[0].lab_name,
      description || lab[0].description,
      capacity || lab[0].capacity,
      equipment || lab[0].equipment,
      depo_code || lab[0].depo_code,
      image_name,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lab not found" });
    }
    res.json({ message: "Lab updated successfully" });
  } catch (error) {
    console.log("Error at updating lab", error);
    res.status(500).json({ message: "Error at updating lab", error });
  }
};

module.exports = {
  addLabs,
  getLabs,
  deleteLab,
  updateLab,
};
