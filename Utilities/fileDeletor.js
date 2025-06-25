const minioClient = require("../minio/connectMinio");

const fileDeletor = async (filePath) => {
  if (filePath.endsWith('/')) {
    deleteFolder(process.env.MINIO_BUCKET, filePath);
  }

  try {
    console.log("Path : ", filePath);
    
    await minioClient.removeObject(process.env.MINIO_BUCKET, filePath);
    console.log(`Successfully deleted file: ${filePath}`);  
    return { success: true, path: filePath };
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error.message);
    throw error; // Re-throw to let the caller handle it
  }
};

const deleteFolder = async (bucketName, folderName) => {
  try {
    const objectsList = [];

    const stream = minioClient.listObjectsV2(bucketName, folderName, true);

    stream.on('data', (obj) => {
      objectsList.push(obj.name);
    });

    stream.on('end', async () => {
      if (objectsList.length === 0) {
        console.log("No objects found in the folder.");
        return;
      }

      // Use removeObjects to delete in batch
      minioClient.removeObjects(bucketName, objectsList, (err) => {
        if (err) {
          console.error("Failed to delete objects:", err);
        } else {
          console.log(`Successfully deleted folder: ${folderName}`);
        }
      });
    });

    stream.on('error', (err) => {
      console.error("Error listing objects:", err);
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};


module.exports = fileDeletor;