import express from 'express';
import { setupSwagger } from './config/swagger';
import { config } from 'dotenv';
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerUiOptions } from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(helmet());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  logger.info("GET / endpoint hit");
  res.json({ message: "TaskFlow API running with PostgreSQL!" });
});

setupSwagger(app);
const port = process.env.PORT || 3000;

export { app };
