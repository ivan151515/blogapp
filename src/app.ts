import express from 'express';
import blogRouter from './routes/blogs';
import "express-async-errors";
import userRouter from './routes/users';
const app = express();
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

export default app;