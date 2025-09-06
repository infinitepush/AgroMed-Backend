
const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "crop-disease-images", 
        format: async (req, file) => 'png',
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage });


exports.uploadImage = async (req, res) => {
    try {
      
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file uploaded." });
        }
        
        
        const imageUrl = req.file.path;

        
        const newImage = await Image.create(imageUrl);

       
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image: newImage
        });
    } catch (error) {
      
        console.error("Error uploading image:", error.stack);
        res.status(500).json({ 
            success: false, 
            message: "Upload failed.", 
            error: error.message 
        });
    }
};


exports.uploadMiddleware = upload.single("image");