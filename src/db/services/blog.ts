import { BlogInput, BlogOutput } from "../models/blog";
import * as blogDal from "../dal/blog";
import BadRequestError from "../../errors/BadRequestError";
export const getAll = async (): Promise<BlogOutput[]> => {
    return blogDal.getAll();
};

export const getOne = async (id : string) :Promise<BlogOutput> => {
    return blogDal.getById(id );
};

export const createBlog = async (blogData : BlogInput) => {
    const blog = blogDal.createBlog(blogData);

    return blog;
};

export const updateBlog = async (userId : number, important: boolean, blogId :string) => {
    let blog = await blogDal.getById(blogId);

    if (blog.id == userId) {
        blog = await blogDal.updateBlog(important, blogId);
        return blog;
    } else {
        throw new BadRequestError({code: 403, message: "Forbidden"});
    }

};