import express from 'express';
import router from './controllers/blogs';
import "express-async-errors";
import { connectToDatabase } from './util/db';
const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/api", router);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();