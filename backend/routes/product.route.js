import express from "express";
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({}); // if you pass empty obj in find, it fetches all the data in the database
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})


router.post("/", async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success:true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted" })
    } catch (error) {
        console.error("Error message: ", error.message)
        res.status(404).json({ success:"false", message: "Product not found" })
    }
});

// put updates the entire document, whereas patch updates only specific fields
// but put works fine here as well because the fields that dont need updating gets the same original value
router.put("/:id", async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success:false, message:'Product not found' })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}) // new:true returns the new updated data, whereas false returns the original data
        res.status(200).json({ success:true, data:updatedProduct })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success:false, message: "server error" })
    }
})

export default router;