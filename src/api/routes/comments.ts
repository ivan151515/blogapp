/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as commentController from "../controllers/comment";
const commentRouter = Router();

commentRouter.post("/", commentController.addComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.put("/:id", commentController.updateComment);

export default commentRouter;