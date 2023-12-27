/* eslint-disable @typescript-eslint/no-misused-promises */
import { RequestHandler } from "express";
import * as authService from "../../../db/services/auth";
import { toLoginEntry } from "../../../util/requestParsers";
export const logIn : RequestHandler = async (req, res) => {
    const loginEntry = toLoginEntry(req.body);
    const response = await authService.login(loginEntry);

    return res.json(response);
};