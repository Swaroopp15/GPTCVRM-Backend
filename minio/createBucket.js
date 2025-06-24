const minioClient = require("./connectMinio");

const createBucket = async (bucketName) => {
  try {
    console.log("Creating bucket : ", bucketName);
    await minioClient.makeBucket(bucketName);
    console.log("Bucket created successfully");
    const buckets = await minioClient.listBuckets();
    console.log("Buckets available are :");
    for(const bucket in buckets) {
      console.log(`${bucket.name} is created on ${bucket.creationDate}`);
    }
  } catch (error) {
    console.log("Error in creating bucket : ", error);
    throw new Error(error);
    
  }
}

module.exports = createBucket;