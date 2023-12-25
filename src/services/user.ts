import User from "../models/user";
import { UserEntry } from "../types";
import { createPassword } from "../util/createPassword";
import { isString } from "../util/requestParsers";
export const addUser = async(entry : UserEntry) => {
    const hash = await createPassword(entry.password);
    if (!isString(hash)) {
        entry.password = hash;
        throw new Error("Something went wrong");
    }
    entry.password = hash;
    const user = await User.create(entry);
    return user;
};