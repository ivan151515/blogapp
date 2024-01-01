/* eslint-disable @typescript-eslint/no-misused-promises */
import { RequestHandler } from "express";
import * as userService from "../../../db/services/user";
import { toProfileEntry, toUserEntry, toUserIdFromToken } from "../../../util/requestParsers";
import {  UpdateProfileDTO } from "../../dto/profile.dto";
import BadRequestError from "../../../errors/BadRequestError";
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

export const updateProfile : RequestHandler = async (req, res) => {
    const userIdFromToken = toUserIdFromToken(req.body.user);
    if (Number(req.params.id) != userIdFromToken) {
        throw new BadRequestError({message: "Action not allowed", code: 403});
    }
    const profileEntry : UpdateProfileDTO = toProfileEntry({...req.body, id: Number(req.params.id)});

    const profile = await userService.updateProfile(profileEntry, userIdFromToken);

    res.json(profile);
};