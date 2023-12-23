import { config } from "dotenv";
config();

const DATABASE_URL = process.env.DATABASE_URL;



export {DATABASE_URL};