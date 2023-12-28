import { Optional } from "sequelize";
export type CreateBlogDTO = {
    content: string,
    date: string,
    important: boolean,
    userId: number
};

export type updateBlogDTO = Optional<CreateBlogDTO, "important" | "content" | "date">;