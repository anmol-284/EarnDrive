const Bike = require('../model/bikemodel');
const User = require('../model/usermodel');
const cloudinary = require('../config/cloudinary');

function isType(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.listBikeWithImage = async (req, res) => {
  try {
    // Log the request body to debug missing fields
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const {
      bikeName,
      bikeModel,
      bikeNumber,
      State,
      City,
      Area,
      pricePerHour,
      pinCode,
      listingTime,
      expirationTime,
      description,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

    if (!Area || !expirationTime) {
      return res.status(400).json({
        message: 'Area and expirationTime are required fields.'
      });
    }

    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (!isType(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported."
      });
    }

    const uploadResponse = await uploadFileToCloudinary(file, "bikes");

    const bike = new Bike({
      bikeName,
      bikeModel,
      bikeNumber,
      State,
      City,
      Area,
      pricePerHour,
      pinCode,
      listingTime: new Date(listingTime.trim()), // Remove leading/trailing whitespace
      expirationTime: new Date(expirationTime.trim()), // Remove leading/trailing whitespace
      description,
      owner: userId,
      imageUrl: uploadResponse.secure_url,
    });

    const savedBike = await bike.save();
    await User.findByIdAndUpdate(userId, { $push: { listedBikes: savedBike._id } });

    res.status(201).json({
      message: 'Bike listed successfully!',
      bike: savedBike
    });
  } catch (error) {
    console.error('Error while listing bike:', error);
    res.status(400).json({
      message: 'Failed to list bike',
      error: error.message
    });
  }
};
