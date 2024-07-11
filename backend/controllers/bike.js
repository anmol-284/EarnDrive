const Bike = require('../model/bikemodel');
const User = require('../model/usermodel');

exports.postbike = async (req, res) => {
  try {
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

    // Ensure req.user.id is available
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

    // Create a new bike instance
    const bike = new Bike({
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
      owner: userId,
    });

    // Save the bike to the database
    const savedBike = await bike.save();

    // Update the user with the new bike ID
    await User.findByIdAndUpdate(userId, { $push: { listedBikes: savedBike._id } });

    // Send success response
    res.status(201).json({
      message: 'Bike listed successfully!',
      bike: savedBike
    });
  } catch (error) {
    // Log the error and send an error response
    console.error('Error while listing bike:', error);
    res.status(400).json({
      message: 'Failed to list bike',
      error: error.message
    });
  }
};
