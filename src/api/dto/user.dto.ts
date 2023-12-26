import { Optional } from "sequelize";
export type CreateUserDTO = {
    username: string,
    password: string,
    name: string
};

export type UpdateUserDTO = Optional<CreateUserDTO, 'name'>;