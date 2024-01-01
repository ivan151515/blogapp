import { UserEntry } from "../../types";
import { createPassword } from "../../util/createPassword";
import { isString } from "../../util/requestParsers";
import * as userDal from "../dal/user";
import * as profileDal from "../dal/profile";
import BadRequestError from "../../errors/BadRequestError";
import {  UpdateProfileDTO } from "../../api/dto/profile.dto";
export const addUser = async(entry : UserEntry) => {
    const hash = await createPassword(entry.password);
    if (!isString(hash)) {
        entry.password = hash;
        throw new Error("Something went wrong");
    }
    entry.password = hash;
    const user = await userDal.userCreate(entry);
    await profileDal.createComment({userId: user.id});
    
    return user;
};

export const getUsers = async  () => {
    const users = await userDal.getAllUsers();

    return users;
};

export const getOneUserById = async (id: string) => {
    const user  = await userDal.getUserById(id);
    if (!user) {
        throw new BadRequestError({message: "Not found", code: 404});
    }
    
    return user;
};

export const updateProfile = async (input : UpdateProfileDTO, userId: number) => {
    const user = await profileDal.updateProfile(input, userId);
    return user;
};
