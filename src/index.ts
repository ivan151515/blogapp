import express from 'express';
import blogRouter from './controllers/blogs';
import "express-async-errors";
import { connectToDatabase } from './util/db';
import userRouter from './controllers/users';
const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();