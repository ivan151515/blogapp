import { User } from "./user.interface";

export interface Blog {
    content : string,
    date : string,
    id: number
    userId: number,
    user ?: User
    important: boolean
}