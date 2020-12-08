const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  //trouver user
  const user = await User.findOne({email: req.user.email}).exec()
  // get cart total
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderBy: user._id}).exec()
  const couponApplied = req.body.couponApplied

  let finalAmount = 0

  if(couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount)
  } else {
    finalAmount = Math.round(cartTotal)
  }

  console.log('PRIX PAYER', cartTotal, totalAfterDiscount)
  //creer l'intention de paiment avec la commande et la devise

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "eur",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount * 100
  });
};
