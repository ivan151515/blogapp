import  { ProfileInput } from "../models/profile";
import {Profile} from "../models/";




export const createComment = async (input : ProfileInput) => {
    const profile = await Profile.create(input);
    return profile;
};

//TODO: MAKE THESE
export const updateComment = async (id : string) => {
    const [, [profile]] = await Profile.update({}, {
        where: 
        {
            id
         },
         returning: true
    });
    return profile;
};  