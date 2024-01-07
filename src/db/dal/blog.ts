import BadRequestError from "../../errors/BadRequestError";
import { BlogInput, BlogOutput } from "../models/blog";
import {Blog, Comment, User} from "../models/";

export const getAll = async() : Promise<BlogOutput[]>=> {
    const res = await Blog.findAll(
        
    );
    return res;
};

export const getById = async (id: string): Promise<BlogOutput> => {
    const res = await Blog.findByPk(id, {
        include : [{
            model : User,
            attributes : {
                exclude: ["password"]
            }
        },
        {
            model: Comment,
            include : [{
                model: User,
                attributes: {
                    exclude: ["password", "id"]
                }
            }]
        }
        ]
    },);
    if (!res) {
        throw new BadRequestError({message: "Not found", code: 404});
    }
    return res;
};

export const createBlog = async (input : BlogInput) => {
    const blog = await Blog.create(input);
    return blog;
};

export const deleteBlog = async (blogId : string) => {
    const res = await Blog.destroy({
        where : {
            id: blogId
        }
    });
    return res;
};

export const updateBlog = async (important : boolean, id: string) => {
    const [, [blog]] = await Blog.update({important}, {
        where: 
        {
            id
         },
         returning: true
    });
    return blog;
};  