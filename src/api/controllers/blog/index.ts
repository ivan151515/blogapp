/* eslint-disable @typescript-eslint/no-misused-promises */
import * as blogService from "../../../db/services/blog";
import {RequestHandler } from "express";
import { BlogEntry } from "../../../types";
import { toBlogEntry } from "../../../util/requestParsers";
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