const minioClient = require("../minio/connectMinio");

const getPresignedUrl = async (fileName, method = "GET",expiry = 60*60) => {
  try {
    const url = await minioClient.presignedUrl(method, process.env.MINIO_BUCKET, fileName, expiry);
    return url;
  } catch (error) {
    console.log("Error in creating a presigned url : ", error);
    throw error;
  }
}

module.exports = getPresignedUrl;