import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/CustomError";
import BadRequestError from "../errors/BadRequestError";

export const errorHandler :ErrorRequestHandler = (err, _request, res, _next) => {
    if(err instanceof CustomError) {
        const { statusCode, errors, logging } = err;
        if(logging) {
          console.error(JSON.stringify({
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          }, null, 2));
        }
    
        return res.status(statusCode).send({ errors });
      }
    if (err.name == "SequelizeUniqueConstraintError") {
        throw new BadRequestError({code: 403, message: "unique constraint violated"});
    }
    if (err.name == "SequelizeDatabaseError") {
        throw new BadRequestError({code: 404, message: "Not found"});
    }
      // Unhandled errors
      console.error(JSON.stringify(err, null, 2));
      return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};