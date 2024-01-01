export type ProfileDTO = {
    id?: number,
    bio?: string,
    userId: number,
    occupation?: string,
    age?: number,
    created?: boolean
};

export type UpdateProfileDTO = Omit<ProfileDTO, "userId">;