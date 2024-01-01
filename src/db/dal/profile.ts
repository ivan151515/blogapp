import  { ProfileInput } from "../models/profile";
import {Profile} from "../models/";
import { UpdateProfileDTO } from "../../api/dto/profile.dto";


export const getProfile = async () => {
    const profile = await Profile.findOne();

    return profile;
};

export const createComment = async (input : ProfileInput) => {
    const profile = await Profile.create(input);
    return profile;
};

export const updateProfile = async (input : UpdateProfileDTO, userId : number) => {
    const [, [profile]] = await Profile.update(input, {
        where: 
        {
            userId
         },
         returning: true
    });
    return profile;
};  