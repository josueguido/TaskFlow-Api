import express from 'express';
import { setupSwagger } from './config/swagger';
import { config } from 'dotenv';
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerUiOptions } from 'swagger-ui-express';
import { logger } from './utils/logger';
import { securityConfig } from './config/security';
import { preventSQLInjection, sanitizeInput } from './middlewares/sanitize.middleware';

const app = express();

app.use(cors(securityConfig.cors));
app.use(helmet());
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(sanitizeInput);
app.use(preventSQLInjection);

const limiter = rateLimit({
  ...securityConfig.rateLimit,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/", (req, res) => {
  logger.info("GET / endpoint hit");
  res.json({ message: "TaskFlow API running with PostgreSQL!" });
});

setupSwagger(app);
const port = process.env.PORT || 3000;

export { app };
