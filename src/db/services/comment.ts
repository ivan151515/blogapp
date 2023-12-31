import { CommentInput } from "../models/comment";
import * as commentDal from "../dal/comment";
import BadRequestError from "../../errors/BadRequestError";
export const addComment = async (input : CommentInput) => {
    const comment = await commentDal.createComment(input);

    return comment;
};

export const deleteComment = async(userId :number, commentId: number) => {
    const comment = await commentDal.getById(commentId);

    if (!comment) {
        throw new BadRequestError({message: "Comment does not exist", code: 404});

    }

    if (comment.userId !== userId) {
        throw new BadRequestError({message: "Unauthorized", code: 403});
    }

    await commentDal.deleteComment(commentId);
};

export const updateCommment = () => {};