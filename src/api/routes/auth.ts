/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { toLoginEntry } from "../../util/requestParsers";
import User from "../../db/models/user";
import BadRequestError from "../../errors/BadRequestError";

const authRouter = Router();

authRouter.post("/", async (req, res) => {
    const {username, password} = toLoginEntry(req.body);

    const user = await User.findOne({
        where : {
            username 
        }
    });
    if (!user) {
        throw new BadRequestError({message: "User not found", code: 404});
    } 
    //TODO: ACCESS FIELDS FROM SEQUELIZE RESPONSE
    //const passwordMatch = compare(password, user);
    //const passwordMatch = compare(username, user.password);
    
    console.log(password, user);
    console.log(req);
    //TODO: FINSIH AUTH
    res.sendStatus(200);
});

export default authRouter;