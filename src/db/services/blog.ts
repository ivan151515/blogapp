import { BlogInput, BlogOutput } from "../models/blog";
import * as blogDal from "../dal/blog";
import * as commentDal from "../dal/comment";
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

    if (blog.userId == userId) {
        blog = await blogDal.updateBlog(important, blogId);
        return blog;
    } else {
        throw new BadRequestError({code: 403, message: "Forbidden"});
    }

};

export const deleteBlog = async (userId: number, blogId: string) => {
    const blog = await blogDal.getById(blogId);
    if (!blog) {
        throw new BadRequestError({message: "Blog does not exist", code: 404});

    }
    if (blog.userId != userId) {
        console.log(blog, blog.userId, userId, "DELETE BLOG");
        throw new BadRequestError({message: "Action not allowed", code: 403});
    }
    const commentsDeleted = await commentDal.deleteAllBlogsComments(blogId);
    const blogsDeleted = await blogDal.deleteBlog(blogId);

    return {commentsDeleted, blogsDeleted};
};