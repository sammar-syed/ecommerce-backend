const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


router.get("/", getProducts);
router.post("/", addProduct);

// Route to update a product by ID
router.put("/:id", protect, updateProduct); // 'protect' middleware ensures the user is authorized

// Route to delete a product by ID
router.delete("/:id", protect, deleteProduct);

module.exports = router;

