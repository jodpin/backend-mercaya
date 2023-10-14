// 1 paso: importar el modelo schema
import Posts from "../models/blog.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const createBlog = async (req, res) => {
  try {
    const body = req.body;

    // req imprime los archivos que le envie

    // si hay una imagen la sube a cloudinary
    const post = new Posts(body);

    if (req.files) {
      const result = await uploadImage(req.files.image.tempFilePath);
      post.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      console.log(result);
      // console.log(req.files.image)
    }

    await fs.unlink(req.files.image.tempFilePath);

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findById(id);

    if (!post) {
      res.status(404).json({
        message: "Post does not exist",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedPost = await Posts.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//   export const deletePost = async (req, res) => {
//     try {
//       const id = req.params.id;
  
//       const post = await Posts.findByIdAndDelete(id);
  
//       if (!post) {
//         res.status(404).json({
//           message: "The process failed",
//         });
//       }
  
//       if (post.image?.public_id) {
//         await deleteImage(post.image.public_id);
//       }
  
//       res.json(post);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
