const path = require('path');
const fs = require("fs");
const uploadObject = require('../minio/uploadFiles');

const fileSaver = async (file, name, folder) => {
  try {
    const tempPath = path.join(process.cwd(), "temp");
    // checking if the temporary folder exists and if not creatin it.
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }
    // creating a new path which includes the file and saving it into filesystem
    const tempFilePath = path.join(tempPath, name+path.extname(file.name));
    await file.mv(tempFilePath);
    const bucketName = process.env.MINIO_BUCKET;
    // uploading the file into the minio bucket
    await uploadObject(tempFilePath, folder, bucketName);
    // deleting the temporary folder.
    fs.unlinkSync(tempFilePath);
    return `${folder}/${name}${path.extname(file.name)}`;
  } catch (error) {
    console.log("error in saving the file");
    throw error;
  }
};

module.exports = fileSaver;
