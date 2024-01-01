export type CreateCommentDTO = {
    content: string,
    blogId: number,
    userId: number,
    id?: number
};

export type UpdateCommentDTO = Omit<CreateCommentDTO, "blogId">;

export type DeleteCommentDTO = {
    userId: number,
    id: number
};