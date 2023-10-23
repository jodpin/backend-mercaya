import Producto from "../models/product.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
// fs es un paquete que se usa para manejar los archivos en este caso eliminarlos

export const getProducts = async (req, res) => {
  try {
    const products = await Producto.find();
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
    const product = new Producto(body);
    console.log(body);

    if (req.files) {
      // console.log("entramos al files");
      // console.log(req.files.file.tempFilePath);
      // console.log("antes de este debe estar el nombre");
      const result = await uploadImage(req.files.file.tempFilePath);
      product.imagen = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      console.log(result);
    }

    await fs.unlink(req.files.file.tempFilePath);

    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Producto.findById(id);

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

    const updatedProduct = await Producto.findByIdAndUpdate(id, req.body, {
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

    const product = await Producto.findByIdAndDelete(id);

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
