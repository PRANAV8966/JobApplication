const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3-config");
const { AWS_S3_BUCKET_NAME }  = require('../config/server-config.js');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME, 
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,   
    contentDisposition: "inline",                      
    key: (req, file, cb) => {
      const fileName = `resumes/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

module.exports = upload;
