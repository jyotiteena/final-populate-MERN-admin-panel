const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: "drzyewehz",
    api_key: "125987267655216",
    api_secret: "5OYzrc9Fes8e4iMHrTIxWf_Vfb0",
});
console.log("cloudinary...................")

// Multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
    },
});


const upload = multer({ storage });

module.exports = upload;
