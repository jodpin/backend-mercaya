import Product from "../models/product.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
// fs es un paquete que se usa para manejar los archivos en este caso eliminarlos

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createProducts = async (req, res) => {
  try {
    const body = req.body;

    // req imprime los archivos que le envie

    // si hay una imagen la sube a cloudinary
    const product = new Product(body);

    if (req.files) {
      const result = await uploadImage(req.files.image.tempFilePath);
      product.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      console.log(result);
      // console.log(req.files.image)
    }

    await fs.unlink(req.files.image.tempFilePath);

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        message: "Product does not exist",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        message: "The process failed",
      });
    }

    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
