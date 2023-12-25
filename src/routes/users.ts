/* eslint-disable @typescript-eslint/no-misused-promises */
import {  Router } from "express";
import User from "../models/user";
import { toUserEntry } from "../util/requestParsers";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", async(_req, res)  => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req, res) => {
    const userEntry = toUserEntry(req.body);
    //TODO: CREATE PASSWORD HASH, SEPARATE SERVICE FROM ROUTES
    const user = await User.create(userEntry);

    res.json(user);
});

export default router;