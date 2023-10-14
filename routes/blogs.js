import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  createBlog,
  getBlogs,
  getOnePost,
  updatePost,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/blog", getBlogs);
blogRouter.get("/blog/:id", getOnePost);
blogRouter.post(
  "/blog",

  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createBlog
);
blogRouter.put("/blog/:id", updatePost);
// blogRouter.delete("blog/:id", deletePost);

export default blogRouter;
