const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        // Create and save the product
        const product = new Product({ name, description, price, stock, category });
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle any validation errors
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove the product
        await product.remove();
        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" }); // Handle any server errors
    }
};


// Update product details
const updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the route parameter
    const { name, description, price, stock, category } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;

        // Save the updated product
        await product.save();

        res.status(200).json({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Export all the functions together
module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
