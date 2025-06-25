const minioClient = require("../minio/connectMinio");

const getPresignedUrl = async (folderName, fileName, method = "GET", expiry = 60 * 60) => {
  try {
    const objectKey = `${folderName}/${fileName}`; // Do NOT encode this
    let url = await minioClient.presignedUrl(
      method,
      process.env.MINIO_BUCKET,
      objectKey,
      expiry
    );
    console.log("Generating presigned URL for object:", objectKey);
    console.log("Presigned URL:", url);


    return url;
  } catch (error) {
    console.error("Error generating presigned URL:", error.message);
    throw error;
  }
};
// const image = getPresignedUrl("faculty", "faculty@gmail.com.jpg");


module.exports = getPresignedUrl;