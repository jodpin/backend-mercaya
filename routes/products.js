import { Router } from "express";
import fileUpload from "express-fileupload";

import {
  createProducts,
  deleteProducts,
  getProducts,
  updateProduct,
  getProduct,
} from "../controllers/products.controller.js";
const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post(
  "/products",

  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createProducts
);

router.delete("/products/:id", deleteProducts);

router.put("/product/:id", updateProduct);

export default router;
