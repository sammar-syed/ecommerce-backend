const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id, // the logged-in user
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Get Order By ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

// Update Order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.paymentId,
    status: req.body.status,
    update_time: req.body.updateTime,
    email_address: req.body.emailAddress,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// Delete
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Delete the order
        await order.remove();
        res.status(200).json({ message: "Order removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid, deleteOrder
};
