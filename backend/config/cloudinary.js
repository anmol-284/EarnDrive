const cloudinary = require('cloudinary').v2;

console.log("Cloudinary config loading");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log("Cloudinary config loaded", cloudinary.config());
module.exports = cloudinary;
