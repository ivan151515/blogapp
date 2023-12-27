import { BlogOutput } from "../models/blog";
import * as blogDal from "../dal/blog";
export const getAll = async (): Promise<BlogOutput[]> => {
    return blogDal.getAll();
};

export const getOne = async (id : string) :Promise<BlogOutput> => {
    return blogDal.getById(id );
};