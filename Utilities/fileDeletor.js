const minioClient = require("../minio/connectMinio");

const fileDeletor = async (filePath) => {
  if (filePath.endsWith('/')) {
    throw new Error("Folder deletion not allowed. Provide a full file path.");
  }

  try {
    await minioClient.removeObject(process.env.MINIO_BUCKET, filePath);
    console.log(`Successfully deleted file: ${filePath}`);  
    return { success: true, path: filePath };
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error.message);
    throw error; // Re-throw to let the caller handle it
  }
};

module.exports = fileDeletor;