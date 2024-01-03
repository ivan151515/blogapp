/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as authController from "../controllers/auth";
import { tokenExtractor } from "../../middleware/tokenExtractor";

const authRouter = Router();

authRouter.post("/", authController.logIn);
authRouter.get("/", tokenExtractor, authController.verify);
export default authRouter;