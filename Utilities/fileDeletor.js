const minioClient = require("../minio/connectMinio");

const fileDeletor = async (filePath) => {
  try {
    await minioClient.removeObject(process.env.MINIO_BUCKET, filePath);
  } catch (error) {
    console.log("Error in deleting file from Bucket : ", error);
    throw error;
  }
}

module.exports = fileDeletor;