import { CommentInput } from "../models/comment";
import {Comment} from "../models/";




export const createComment = async (input : CommentInput) => {
    const comment = await Comment.create(input);
    return comment;
};

//TODO: MAKE THESE
export const updateComment = async (id : string) => {
    const [, [comment]] = await Comment.update({}, {
        where: 
        {
            id
         },
         returning: true
    });
    return comment;
};  