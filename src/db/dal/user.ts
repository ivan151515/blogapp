import { UserInput } from "../models/user";
import {Blog, User} from "../models";
export const findUser = async (username : string) => {
    const user = await User.findOne({where: {
        username
    }});

    return user;
};

export const getAllUsers = async () => {
    const users = await User.findAll();

    return users;
};

export const getUserById = async (id: string) => {
    const user = await User.findByPk(id, 
        {
            include : Blog
        });
    
    return user;
};

export const userCreate = async (entry : UserInput) => {
    const user = await User.create(entry);

    return user;
};