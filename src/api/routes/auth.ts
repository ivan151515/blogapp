/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as authController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/", authController.logIn);

export default authRouter;