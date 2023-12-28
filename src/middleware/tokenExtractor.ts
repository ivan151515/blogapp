import { RequestHandler, Request } from "express";
import { getTokenFromRequest } from "../util/getTokenFromRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

export const tokenExtractor : RequestHandler = (req, _res, next) => {
    const token = getTokenFromRequest(req);
    
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY as string) as JwtPayload;
    req.body.user = decodedToken;
    next();
};