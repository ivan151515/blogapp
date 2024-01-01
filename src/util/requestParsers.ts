import { updateBlogDTO } from "../api/dto/blog.dto";
import { CreateCommentDTO, DeleteCommentDTO, UpdateCommentDTO } from "../api/dto/comment.dto";
import {  UpdateProfileDTO } from "../api/dto/profile.dto";
import BadRequestError from "../errors/BadRequestError";
import { BlogEntry, LoginEntry, UserEntry } from "../types";
export const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};
export const isNumber = (value : unknown) : value is number => {
    return typeof value ==="number" && !Number.isNaN(value);
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
export const toUserIdFromToken = (token : unknown) => {
    if (token && typeof token == "object" && "id" in token) {
        return parseNumber(token.id);
    } else {
        console.log("im fthowing error");
        throw new Error("Something went wrong");
    }
};
export const toProfileEntry = (body: unknown) : UpdateProfileDTO => {
    const profileEntry : UpdateProfileDTO = {
        created: true,
    };
    if (body && typeof body == "object" ) {
        if ("bio" in body) {
            profileEntry.bio = parseString(body.bio, 1, "bio");
        }
        if ("age" in body) {
            profileEntry.age = parseNumber(body.age);
        }
        if ("occupation" in body) {
            profileEntry.occupation = parseString(body.occupation, 3, "occupation");
        }
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
    //TODO: 
    console.log(body);
    return profileEntry;
};
export const toCommentInput = (body : unknown) : CreateCommentDTO => {
    const commentInput : CreateCommentDTO = {
        blogId : -1,
        content: "",
        userId: -1
    };
    if (body && typeof body == "object" && "blogId" in body &&"content" in body && "user" in body && body.user && typeof body.user == "object" && "id" in body.user) {
        commentInput.content = parseString(body.content, 1, "content");
        commentInput.userId = parseNumber(body.user.id);
        commentInput.blogId = parseNumber(body.blogId);
    }  else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
    return commentInput;
};
export const toDeleteCommentDTO = (body: unknown): DeleteCommentDTO => {
    const commentInput : DeleteCommentDTO = {
        userId: 0,
        id: 0
    };
    if (body && typeof body == "object" && "user" in body && body.user && typeof body.user == "object" && "id" in body.user && "id" in body) {
        commentInput.userId = parseNumber(body.user.id);
        commentInput.id = parseNumber(body.id);
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }
    return commentInput;
};
export const toUpdateComment = (body: unknown): UpdateCommentDTO => {
    const comment : UpdateCommentDTO = {
        content: "",
        userId: 0
    };
    console.log(body);
    if (body && typeof body === "object" && "content" in body && "user" in body && body.user && typeof body.user == "object" && "id" in body.user && "id" in body) {
        comment.content = parseString(body.content, 1, "content");
        comment.userId = parseNumber(body.user.id);
        comment.id = parseNumber(body.id);
    } else {
        console.log("i THRWO ERROR");
        throw new BadRequestError({message: "Invalid input"});
    }
    return comment;
};
export const toUpdateBlogEntry = (body: unknown) : updateBlogDTO => {
    const blogEntry : updateBlogDTO = {
        userId: 0
    };

    if(body && typeof body === "object" && "user" in body && "important" in body && body.user && typeof body.user == "object" && "id" in body.user) {
        blogEntry.important = parseBoolean(body.important);
        blogEntry.userId = parseNumber(body.user.id);
    } else {
        throw new BadRequestError({message: "Invalid input", code: 400});
    }

    return blogEntry;
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