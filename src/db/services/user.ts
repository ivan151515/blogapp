import { UserEntry } from "../../types";
import { createPassword } from "../../util/createPassword";
import { isString } from "../../util/requestParsers";
import * as userDal from "../dal/user";
import BadRequestError from "../../errors/BadRequestError";
export const addUser = async(entry : UserEntry) => {
    const hash = await createPassword(entry.password);
    if (!isString(hash)) {
        entry.password = hash;
        throw new Error("Something went wrong");
    }
    entry.password = hash;
    const user = await userDal.userCreate(entry);
    return user;
};

export const getUsers = async  () => {
    const users = await userDal.getAllUsers();

    return users;
};

export const getOneUserById = async (id: string) => {
    const user = await userDal.getUserById(id);
    if (!user) {
        console.log(user, "DEBUG", id);
        throw new BadRequestError({message: "Not found", code: 404});
    }
    return user;
};

