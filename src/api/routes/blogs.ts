/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from "express";
import Blog from "../../db/models/blog";

const blogRouter = Router();

blogRouter.get("/ping", (_req, res) => {
    res.send("Pong");
});


blogRouter.get("/", async(_req, res) => {
    const blogs = await Blog.findAll();
    //TODO: ADD USER INFO
    res.json(blogs);
});

blogRouter.get("/:id", async (req : Request, res: Response) => {
    const blog = await Blog.findByPk(req.params.id);
    //TODO: ADD USER INFO
    res.json(blog);
});
export default blogRouter;