import { config } from "dotenv";
config();

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_TEST_URL= process.env.DATABASE_TEST_URL;
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export {DATABASE_URL, DATABASE_TEST_URL, PORT, JWT_SECRET_KEY};