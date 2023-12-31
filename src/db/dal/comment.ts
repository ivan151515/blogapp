import { CommentInput } from "../models/comment";
import {Comment} from "../models/";




export const createComment = async (input : CommentInput) => {
    const comment = await Comment.create(input);

    return comment;
};
export const getById = async(id: number) => {
    const comment = await Comment.findByPk(id);
    
    return comment;
};
//TODO: MAKE THESE
export const updateComment = async (id : number, content : string) => {
    const [, [comment]] = await Comment.update({content}, {
        where: 
        {
            id
         },
         returning: true
    });
    return comment;
};  

export const deleteComment = async (id: number) => {
    await Comment.destroy({
        where : {
            id
        }
    });
};