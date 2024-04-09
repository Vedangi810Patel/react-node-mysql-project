// const multer = require("multer");
// const path = require("path");

// const storageConfig = multer.diskStorage({
//   destination: "./public/assets",
//   filename: function (request, uploadedFile, callback) {
//     callback(
//       null,
//       Date.now() + "-" + uploadedFile.originalname 
//     );
//   },
// });

// const profilepictureauthenticate = multer({
//   storage: storageConfig,
//   // limits: { fileSize: 1000000 }, 
//   fileFilter: function (request, uploadedFile, callback) {
//     checkFileType(uploadedFile, callback);
//   },
// }).single("profilePicture");



// function checkFileType(uploadedFile, callback) {

//   const allowedFileTypes = /jpeg|jpg|png/;
  
//   const extensionName = allowedFileTypes.test(path.extname(uploadedFile.originalname).toLowerCase());
 
//   const mimeType = allowedFileTypes.test(uploadedFile.mimetype);

//   if (mimeType && extensionName) {
//     return callback(null, true);
//   } else {
//     callback("Error: Images only!");
//   }
// }


// module.exports = profilepictureauthenticate;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensureFolderExists(folderPath) {

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

}

// Function to determine destination folder dynamically based on the field name
function getDestination(req, file, cb) {
  
  const fieldName = file.fieldname;
  
  console.log(fieldName);
  
  const folderName =
    fieldName === "profilePicture" ? "profilePicture" : "productImages";
  
    const destination = `./public/assets/${folderName}/`;
  
  ensureFolderExists(destination);
  cb(null, destination);
}


const storageConfig = multer.diskStorage({
  destination: getDestination,
  
  filename: function (req, uploadedFile, callback) {
    callback(
      null,
      Date.now() + "-" + uploadedFile.originalname 
    );
  },

});

const profilePictureAuthenticate = multer({
  
  storage: storageConfig,
  
  limits: { fileSize: 1000000 }, 
  
  fileFilter: function (request, uploadedFile, callback) {
    checkFileType(uploadedFile, callback);
  },

}).single("profilePicture"); 



const productImagesAuthentication = multer({

  storage: storageConfig,
  
  limits: { fileSize: 50000000 }, 
  
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },

}).single("product_images"); 


function checkFileType(uploadedFile, callback) {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extensionName = allowedFileTypes.test(path.extname(uploadedFile.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(uploadedFile.mimetype);

  if (mimeType && extensionName) {
    callback(null, true);
  } else {
    callback("Error: Images only!");
  }
}

module.exports = { profilePictureAuthenticate , productImagesAuthentication};