const minioClient = require("./connectMinio");

const foldersList = ["faculty/", "facility/", "ebooks/", "events/", "images/", "labs/", "departments/"];

const createFolders = async (bucketName) => {
  try {
    foldersList.forEach(folderName => {
        minioClient.putObject(bucketName, folderName, '', (err, objectData) => {
          if (err) { 
            throw err
          }
        })
    });
  } catch (error) {
    console.log("Error in creating folders");
  }
}

module.exports = createFolders;