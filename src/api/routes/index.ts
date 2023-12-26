import { Router } from "express";
import blogRouter from "./blogs";
import userRouter from "./users";
import authRouter from "./auth";

const router = Router();

router.use("/blogs", blogRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
export default router;