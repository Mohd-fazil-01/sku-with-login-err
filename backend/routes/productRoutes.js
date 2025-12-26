import express from "express";
import {
  getProducts,
  getProductBySKU,
  updateQtyBySKU,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import upload from "../middlewares/multer.js";
import auth from "../middlewares/isAuth.js";

const router = express.Router();

// IMAGE UPLOAD (PROTECTED)
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    return res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/sku/:sku", getProductBySKU);
router.get("/:id", getProduct);

// PROTECTED ROUTES
router.put("/update-qty-sku", auth, updateQtyBySKU);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
