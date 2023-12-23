import {  Router } from "express";
import User from "../models/user";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", async(_req, res)  => {
    const users = await User.findAll();
    res.json(users);
});

export default router;