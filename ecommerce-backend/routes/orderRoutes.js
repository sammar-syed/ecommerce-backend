const express = require("express");
const router = express.Router();
const { createOrder, getOrderById, updateOrderToPaid, deleteOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Create a new order
router.route("/").post(protect, createOrder);

// Get order by ID
router.route("/:id").get(protect, getOrderById);

// Update order to paid (e.g., after a payment gateway call)
router.route("/:id/pay").put(protect, updateOrderToPaid);

// DELETE route for deleting an order
router.delete("/:id", protect, deleteOrder);

module.exports = router;
