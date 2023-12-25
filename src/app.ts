import express from 'express';
import blogRouter from './routes/blogs';
import "express-async-errors";
import userRouter from './routes/users';
import { unknownEndpoint } from './middleware/unknownEndpoint';
import { errorHandler } from './middleware/errorHandler';
const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;