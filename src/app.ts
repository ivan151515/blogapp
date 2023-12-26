import express from 'express';
import "express-async-errors";

import { unknownEndpoint } from './middleware/unknownEndpoint';
import { errorHandler } from './middleware/errorHandler';
import router from './api/routes';
const app = express();
app.use(express.json());

app.use("/api", router);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;