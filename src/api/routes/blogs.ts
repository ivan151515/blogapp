/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as blogController from "../controllers/blog";
import * as commentController from "../controllers/comment";
import { tokenExtractor } from "../../middleware/tokenExtractor";
const blogRouter = Router();

blogRouter.get("/ping", (_req, res) => {
    res.send("Pong");
});


blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/:id", blogController.getBlog);
blogRouter.post("/",tokenExtractor, blogController.createBlog);
blogRouter.put("/:id",tokenExtractor, blogController.updateBlog);
blogRouter.post("/:id/comments", tokenExtractor, commentController.addComment);
export default blogRouter;