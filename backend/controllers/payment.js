const Payment = require('../model/Payment');
const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID_RAZORPAY,
    key_secret: process.env.KEY_SECRET_RAZORPAY,
});

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount: Number(amount * 100),
        currency,
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.KEY_SECRET_RAZORPAY)
        .update(body.toString())
        .digest("hex");
        console.log(expectedSignature);
        console.log(razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    }
    else {
        res.status(400).json({
            success: false,
        });
    }
};

exports.getKey = async (req, res) => {
    res.status(200).json({
        key: process.env.KEY_ID_RAZORPAY,
    })
}