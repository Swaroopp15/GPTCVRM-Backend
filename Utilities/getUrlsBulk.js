const getPresignedUrl = require("./getPresignedUrl");

const getBulkUrls = async (data, attributeName) => {
  try {
    const newData = await Promise.all(
      data.map(async (object) => {
        const path = object[attributeName];
        const signedUrl = await getPresignedUrl(path);
        return { ...object, url: signedUrl };
      })
    );

    return newData;
  } catch (error) {
    console.log("Error in creating bulk urls:", error);
    throw error;
  }
};

module.exports = getBulkUrls;
