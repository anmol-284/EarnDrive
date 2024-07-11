const mongoose = require('mongoose');
// const uniqueuser = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxLenth: 50,
        },
        lastname: {
            type: String,
            required: true,
            maxLenth: 50,
        },
        email: {
            type: String,
            required: true,
            maxLenth: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLenth: 8,
        },
        image: {
            type: String,
        },
        location: { type: String },
        dob: { type: Date },
        Registration: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
        Pollution: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pollution' }],
        Insurance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }],
        listedBikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bike' }],
        bookedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    }
)

// userSchema.plugin(uniqueuser);
module.exports = mongoose.model("User", userSchema);