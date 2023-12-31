/* eslint-disable @typescript-eslint/no-misused-promises */
import { RequestHandler } from "express";
import * as userService from "../../../db/services/user";
import { toUserEntry } from "../../../util/requestParsers";
export const getUsers :RequestHandler = async (_req, res) => {

    const users = await userService.getUsers();

    res.json(users);
};

export const getUser :RequestHandler = async (req, res) => {
    const user = await userService.getOneUserById(req.params.id);

    res.json(user);
};

export const createUser : RequestHandler = async (req, res) => {
    const userEntry = toUserEntry(req.body);


    
        const user = await userService.addUser(userEntry);
        
        res.json(user);
        
};

export const updateProfile : RequestHandler = (req, res) => {
    console.log(req, res);
};