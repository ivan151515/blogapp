/* eslint-disable @typescript-eslint/no-misused-promises */
import * as blogService from "../../../db/services/blog";
import {RequestHandler } from "express";
import { BlogEntry } from "../../../types";
import { toBlogEntry, toUpdateBlogEntry, toUserIdFromToken } from "../../../util/requestParsers";
import { updateBlogDTO } from "../../dto/blog.dto";
export const getBlogs : RequestHandler = async (_req, res) => {
    const blogs = await blogService.getAll();
    return res.json(blogs);
};

export const getBlog : RequestHandler = async (req, res) => {
    const blog = await blogService.getOne(req.params.id);
    
    res.json(blog);
};

export const createBlog : RequestHandler = async (req, res) => {
    

    const blogEntry : BlogEntry = toBlogEntry(req.body);

    const blog = await blogService.createBlog(blogEntry);

    res.json(blog);
};

export const updateBlog : RequestHandler = async (req, res) => {
    const {userId, important} : updateBlogDTO = toUpdateBlogEntry(req.body);

    if (important) {
        const blog = await blogService.updateBlog(userId, important, req.params.id);

        res.json(blog);
    }else throw new Error("Something went wrong");

};
export const deleteBlog : RequestHandler = async (req, res) => {
    //TODO: CORRECT BELLOW, PUT JUST TO NOT BE IN ERROR
    const userId = toUserIdFromToken(req.body.user);
    await blogService.deleteBlog(userId, req.params.id);
    
    res.sendStatus(204);
};