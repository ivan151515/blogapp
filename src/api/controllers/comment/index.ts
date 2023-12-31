/* eslint-disable @typescript-eslint/no-misused-promises */
import { RequestHandler } from "express";
import * as commmentService from "../../../db/services/comment";
import { CommentInput } from "../../../db/models/comment";
import { toCommentInput } from "../../../util/requestParsers";
export const getComments = () => {};

export const addComment : RequestHandler = async(req, res) => {
    const commentInput : CommentInput = toCommentInput({...req.body, blogId: Number(req.params.id)});
    const comment = await commmentService.addComment(commentInput);

    res.json(comment);
};

export const deleteComment = () => {};

export const updateComment = () => {};