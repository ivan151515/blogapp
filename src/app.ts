import express from 'express';
import "express-async-errors";
import cors from "cors";
import { unknownEndpoint } from './middleware/unknownEndpoint';
import { errorHandler } from './middleware/errorHandler';
import router from './api/routes';
import compression from 'compression';
import helmet from 'helmet';
const app = express();
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(helmet());

app.use("/api", router);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;