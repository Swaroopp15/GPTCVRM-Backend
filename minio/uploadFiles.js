const fs = require("fs");
const minioClient = require('./connectMinio');
const uploadObject = async (fileName, folderName, bucketName) => {
    const objectFileName = folderName + "/" + fileName.split("/").reverse()[0];
    const fileData = fs.readFileSync(fileName);
    const submitFileDataResult = await minioClient
      .putObject(bucketName, objectFileName, fileData)
      .catch((e) => {
        console.log("Error while creating object from file data: ", e);
        throw e;
      });
    console.log("Successfully uploaded : ", submitFileDataResult);
};

module.exports = uploadObject
