const fs = require("fs")
const path = require("path");

const getMultipleImages = async (parentDir, childDir) => {
  if (!childDir || !parentDir) {
    return null;
  }
  childDir = childDir.toString();
  const directoryPath = path.join(__dirname, "..", "..", "public", "Uploads", parentDir, childDir);
  const domainName = "http://localhost:7000/";
  try {
    const files = await fs.promises.readdir(directoryPath); // Use fs.promises.readdir
    const filePaths = files.map(
      (file) =>
        domainName +
        path.join(`Uploads/${parentDir.toString()}/${childDir}/`, file)
    );
    return filePaths;
  } catch (err) {
    console.error("Unable to scan directory:", err);
    return null;
  }
};

const postMultipleFiles = async (parentDir, childDir, files) => {
  const directoryPath = path.join(__dirname, "..", "..", "public", "Uploads", parentDir, childDir);
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    for (const file of files) {
      const filePath = path.join(directoryPath, file.name);
      await file.mv(filePath);
    } return true;
  } catch (err) {
    console.error("Unable to scan directory:", err); return false;
  }
};

const deleteFolder = async (parentDir, childDir) => {
  const directoryPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "Uploads",
    parentDir,
    childDir
  );

  try {
    // Check if the directory exists
    if (fs.existsSync(directoryPath)) {
      await fs.promises.rm(directoryPath, { recursive: true, force: true });
      console.log("Directory deleted successfully.");
      return true;
    } else {
      console.log("Directory does not exist.");
      return false;
    }
  } catch (err) {
    console.error("Unable to delete directory:", err);
    return false;
  }
};

const postSingleFile = async (parentDir, childDir, file) => {
  const directoryPath = path.join(__dirname, "..", "..", "public", "Uploads", parentDir, childDir);

  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    const filePath = path.join(directoryPath, file.name);
    await file.mv(filePath);
    return true;
  } catch (err) {
    console.error("Unable to scan directory:", err);
    return false;
  }
};

module.exports = { getMultipleImages, postMultipleFiles, deleteFolder, postSingleFile, };
