// import { userRoutes } from "react-router-dom";

import { Router } from "express";

import {createUser, login, profile } from "../controllers/user.controller.js";
import checkAuth from "../middleware/checkAuth.js"

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.post("/users/login", login);


userRouter.get("/users/profile", checkAuth, profile);


export default userRouter;
