/* eslint-disable @typescript-eslint/no-misused-promises */
import {  Router } from "express";
import * as userController from "../controllers/user";
const userRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get("/", userController.getUsers);

userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser); 

export default userRouter;