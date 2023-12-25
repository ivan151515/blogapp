import { UserEntry } from "../types";

const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (text : unknown, minLength : number, name :string) : string => {
    if (!isString(text)) {
        throw new Error('Incorrect or missing input');
      }
    if (text.length < minLength) {
        throw new Error(name + "length must be minimum  " + minLength + " characters long.");
    }
    return text;
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
        throw new Error("invalid input");
    }
    return user;
};