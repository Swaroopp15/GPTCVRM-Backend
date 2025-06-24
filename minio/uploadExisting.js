// const fs = require("fs");
// const path = require("path");
// const uploadObject = require("./uploadFiles");

// const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];

// const uploadExisting = async (bucketName, dirPath) => {
//   const entries = fs.readdirSync(dirPath, { withFileTypes: true });
// console.log(entries);

//   for (const entry of entries) {
//     const fullPath = path.join(dirPath, entry.name);

//     if (entry.isDirectory()) {
//       await uploadExisting(fullPath); // recursion continues
//     } else {
//       const ext = path.extname(entry.name).toLowerCase();
//       if (allowedExtensions.includes(ext)) {
//         const relativePath = path.relative("public/uploads", fullPath);
//         const folderName = path.dirname(relativePath).replace(/\\/g, "/"); // handles 'labs/'

//         console.log(`Uploading ${fullPath} to folder ${folderName}`);
//         await uploadObject(fullPath, folderName, bucketName); // now 'labs' is passed properly
//       }
//     }
//   }
// };

// module.exports = uploadExisting;
