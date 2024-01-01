/* eslint-disable @typescript-eslint/no-misused-promises */
import { RequestHandler } from "express";
import * as commmentService from "../../../db/services/comment";
import { CommentInput } from "../../../db/models/comment";
import { toCommentInput, toDeleteCommentDTO, toUpdateComment } from "../../../util/requestParsers";
import { UpdateCommentDTO } from "../../dto/comment.dto";
export const getComments = () => {};

export const addComment : RequestHandler = async(req, res) => {
    const commentInput : CommentInput = toCommentInput({...req.body, blogId: Number(req.params.id)});
    const comment = await commmentService.addComment(commentInput);

    res.json(comment);
};

export const deleteComment : RequestHandler = async(req, res) => {
    const commentDelete = toDeleteCommentDTO({...req.body, id: Number(req.params.commentId)});
    await commmentService.deleteComment(commentDelete);
    res.sendStatus(204);
};

export const updateComment :RequestHandler= async(req, res) => {
    const commentInput : UpdateCommentDTO = toUpdateComment({...req.body, id: Number(req.params.commentId)});

    const comment = await commmentService.updateCommment(commentInput);
    res.json(comment);
};