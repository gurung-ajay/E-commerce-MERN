import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
// put updates the entire document, whereas patch updates only specific fields
// but put works fine here as well because the fields that dont need updating gets the same original value
router.put("/:id", updateProduct)

export default router;