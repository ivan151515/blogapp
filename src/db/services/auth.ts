import BadRequestError from "../../errors/BadRequestError";
import * as userDal from "../dal/user";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import { LoginEntry } from "../../types";


export const login = async ({username, password} : LoginEntry) => {
    const user = await userDal.findUser(username);
    
    if (!user) {
        throw new BadRequestError({message: "Incorrect username or password", code:403});
    }
    const matching = await bcrypt.compare(password, user.password);
    if (!matching) {
        throw new BadRequestError({message: "Incorrect username or password", code:403});
    }

    const tokenData = {
        username,
        id: user.id
    };

    const token = sign(tokenData, JWT_SECRET_KEY as string);

    return {
        token,
        username,
        id: user.id
    };
};