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
      State: State.toLowerCase(),
      City: City.toLowerCase(), 
      Area: Area.toLowerCase(),
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

exports.getBikes = async (req, res) => {
    try {
        const { City, State, Area, pinCode } = req.query;
        const filter = { expirationTime: { $gt: new Date() } };

        if (City) {
            filter.City = City;
        }
        if (State) {
            filter.State = State;
        }
        if (Area) {
            filter.Area = Area;
        }
        if (pinCode) {
            filter.pinCode = pinCode;
        }

        const bikes = await Bike.find(filter).populate('owner');
        res.status(200).json(bikes);
    } 
    catch (error) {
        console.error('Error fetching bikes:', error);
        res.status(500).json({ message: 'Failed to fetch bikes' });
    }
};
