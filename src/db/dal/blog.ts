import BadRequestError from "../../errors/BadRequestError";
import Blog, { BlogInput, BlogOutput } from "../models/blog";

export const getAll = async() : Promise<BlogOutput[]>=> {
    const res = await Blog.findAll();
    return res;
};

export const getById = async (id: string): Promise<BlogOutput> => {
    const res = await Blog.findByPk(id);
    if (!res) {
        throw new BadRequestError({message: "Not found", code: 404});
    }
    return res;
};

export const createBlog = async (input : BlogInput) => {
    const blog = await Blog.create(input);
    return blog;
};