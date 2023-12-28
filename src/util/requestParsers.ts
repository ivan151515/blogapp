import BadRequestError from "../errors/BadRequestError";
import { BlogEntry, LoginEntry, UserEntry } from "../types";
export const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};
export const isNumber = (value : unknown) : value is number => {
    return typeof value ==="number";
};
const parseString = (text : unknown, minLength : number, name :string) : string => {
    if (!isString(text)) {
        throw new BadRequestError({message: 'Incorrect or missing input', code: 400});
      }
    if (text.length < minLength) {
        throw new BadRequestError({message: name + " length must be minimum  " + minLength + " characters long.", code: 400});
    }
    return text;
};
const parseBoolean = (value : unknown) : boolean => {
    if  (typeof value == "boolean") {
        return value;
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
};
const parseNumber = (value : unknown) : number => {
    if (isNumber(value)) {
        return value;
    } else{
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
};
export const toBlogEntry = (body: unknown) : BlogEntry => {
    const blogEntry : BlogEntry = {
        content: "",
        userId: 0,
        important: false
    };
    
    if (body && typeof body === "object" && "content" in body && "user" in body && "important" in body && body.user && typeof body.user == "object" && "id" in body.user) {
        blogEntry.content = parseString(body.content, 5, "content");
        blogEntry.important = parseBoolean(body.important);
        
        blogEntry.userId = parseNumber(body.user.id);

        if ("date" in body) {
            blogEntry.date = parseString(body.date, 8, "date");
        }
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }

    return blogEntry;

};

export const toLoginEntry = (body: unknown) : LoginEntry=> {
    const loginEntry : LoginEntry = {
        username: "",
        password: ""
    };

    if (body && typeof body === "object" && "username" in body && "password" in body) {
        loginEntry.password = parseString(body.password, 8, "password");
        loginEntry.username = parseString(body.username, 4, "username");
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
    return loginEntry;
};
export const toUserEntry = (body : unknown) : UserEntry => {
    const user : UserEntry = {
        name: "",
        username: "",
        password: ""
    };
    if (body && typeof body === "object" && "name" in body && "username" in body && "password" in body) {
        user.name = parseString(body.name, 4, "name");
        user.username = parseString(body.username, 4, "username");
        user.password = parseString(body.password, 8, "password");
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
    return user;
};