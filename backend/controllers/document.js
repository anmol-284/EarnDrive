const Bike = require('../model/bikemodel');
const User = require('../model/usermodel');
const Registration = require('../model/registration');
const Insurance = require('../model/Insurance');
const Pollution = require('../model/Pollution');
const cloudinary = require('../config/cloudinary');

function isType(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.document1 = async (req, res) => {
  try {
    // Log the request body and files to debug missing fields
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

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

    const uploadResponse = await uploadFileToCloudinary(file, "Registration");

    const registration = new Registration({
      owner: userId,
      imageUrl: uploadResponse.secure_url,
    });

    const savedRegistration = await registration.save();
    await User.findByIdAndUpdate(userId, { $push: { registrations: savedRegistration._id } });

    res.status(201).json({
      message: 'Registration uploaded successfully!',
      registration: savedRegistration
    });
  } catch (error) {
    console.error('Error while uploading registration:', error);
    res.status(400).json({
      message: 'Failed to upload registration',
      error: error.message
    });
  }
};

exports.document2 = async (req, res) => {
  try {
    // Log the request body and files to debug missing fields
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

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

    const uploadResponse = await uploadFileToCloudinary(file, "Insurance");

    const insurance = new Insurance({
      owner: userId,
      imageUrl: uploadResponse.secure_url,
    });

    const savedInsurance = await insurance.save();
    await User.findByIdAndUpdate(userId, { $push: { insurance: savedInsurance._id } });

    res.status(201).json({
      message: 'Insurance uploaded successfully!',
      insurance: savedInsurance
    });
  } catch (error) {
    console.error('Error while uploading insurance:', error);
    res.status(400).json({
      message: 'Failed to upload insurance',
      error: error.message
    });
  }
};

exports.document3 = async (req, res) => {
  try {
    // Log the request body and files to debug missing fields
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

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

    const uploadResponse = await uploadFileToCloudinary(file, "Pollution");

    const pollution = new Pollution({
      owner: userId,
      imageUrl: uploadResponse.secure_url,
    });

    const savedPollution = await pollution.save();
    await User.findByIdAndUpdate(userId, { $push: { pollution: savedPollution._id } });

    res.status(201).json({
      message: 'Registration uploaded successfully!',
      pollution: savedPollution
    });
  } catch (error) {
    console.error('Error while uploading pollution:', error);
    res.status(400).json({
      message: 'Failed to upload pollution',
      error: error.message
    });
  }
};
