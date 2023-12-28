import User, { UserInput } from "../models/user";

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
    console.log("DAL", "USER", id);
    const user = await User.findByPk(id);
    
    return user;
};

export const userCreate = async (entry : UserInput) => {
    const user = await User.create(entry);

    return user;
};