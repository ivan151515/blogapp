/* eslint-disable @typescript-eslint/no-misused-promises */
import {  Router } from "express";
import User from "../../db/models/user";
import { toUserEntry } from "../../util/requestParsers";
import { addUser } from "../../db/services/user";

const userRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get("/", async(_req, res)  => {
    const users = await User.findAll();
    res.json(users);
});

userRouter.post("/", async (req, res) => {
    const userEntry = toUserEntry(req.body);


    
        const user = await addUser(userEntry);
        
        res.json(user);
        


    
});
userRouter.get("/:id", async(req, res) => {
    const user = await User.findByPk(req.params.id);

    res.json(user);
}); 

export default userRouter;