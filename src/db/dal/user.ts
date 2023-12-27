import User from "../models/user";

export const findUser = async (username : string) => {
    const user = await User.findOne({where: {
        username
    }});

    return user;
};