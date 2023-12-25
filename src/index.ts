import { connectToDatabase } from './util/db';
import app from "./app";
import { PORT } from './config';

const port = PORT || 3001;

const start = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

void start();