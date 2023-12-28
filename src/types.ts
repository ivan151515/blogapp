export type UserEntry = {
    name: string,
    username: string,
    password: string
};

export type LoginEntry = {
    username : string,
    password : string
};

export type TokenData = {
    id : number,
    username : string
};

export type BlogEntry = {
    content : string,
    date? : string,
    userId : number,
    important: boolean
};