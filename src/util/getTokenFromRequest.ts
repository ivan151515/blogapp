import { Request } from "express";
import BadRequestError from "../errors/BadRequestError";
export const getTokenFromRequest = (request : Request) => {

    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '');
    } else {
        throw new BadRequestError({message: "Not authorized", code: 403});
    }
  };