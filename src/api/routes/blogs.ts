/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as blogController from "../controllers/blog";

const blogRouter = Router();

blogRouter.get("/ping", (_req, res) => {
    res.send("Pong");
});


blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/:id", blogController.getBlog);
export default blogRouter;