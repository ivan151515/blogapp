import { UserInput } from "../models/user";
import {Blog, Profile, User} from "../models";
export const findUser = async (username : string) => {
    const user = await User.findOne({where: {
        username
    },
    include : {
        model: Profile
    }
});

    return user;
};

export const getAllUsers = async () => {
    const users = await User.findAll({
        attributes : {
            exclude: ["password"]
        }
    });

    return users;
};

export const getUserById = async (id: string) => {
    const user = await User.findByPk(id, {
        include : [{
            model: Blog,
        }, {
            model: Profile
        }],
        attributes : {
            exclude : ["password"]
        }
    });
    
    return user;
};

export const userCreate = async (entry : UserInput) => {
    const user = await User.create(entry);

    return user;
};