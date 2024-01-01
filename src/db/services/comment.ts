import { CommentInput } from "../models/comment";
import * as commentDal from "../dal/comment";
import BadRequestError from "../../errors/BadRequestError";
import { DeleteCommentDTO, UpdateCommentDTO } from "../../api/dto/comment.dto";
export const addComment = async (input : CommentInput) => {
    const comment = await commentDal.createComment(input);

    return comment;
};

export const deleteComment = async(input : DeleteCommentDTO) => {
    const {id, userId} = input;
    const comment = await commentDal.getById(id);

    if (!comment) {
        throw new BadRequestError({message: "Comment does not exist", code: 404});

    }

    if (comment.userId !== userId) {
        throw new BadRequestError({message: "Action not allowed", code: 403});
    }

    await commentDal.deleteComment(id);
};

export const updateCommment = async(input : UpdateCommentDTO) => {
    const {content, userId, id} = input;
    if (!id) {
        throw new BadRequestError({message: "Invalid id", code: 400});
    }
    let comment = await commentDal.getById(id);
    if (!comment) {
        throw new BadRequestError({message: "Comment does not exist", code: 404});

    } 
    if (comment.userId != userId) {
        throw new BadRequestError({message: "Action not allowed", code: 403});
    }

    comment = await commentDal.updateComment(id, content);

    return comment;
};