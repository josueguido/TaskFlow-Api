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
import { sanitizeInput } from './middlewares/sanitize.middleware';
import { startSecurityCleanup } from './middlewares/security.cleanup';
import { preventSQLInjection } from './middlewares/prevent.SQLInjection';
import userRoutes from './routes/users/user.routes';
import taskRoutes from './routes/tasks/task.routes';
import assignmentRoutes from './routes/tasks/assignment.routes';
import statusRoutes from './routes/tasks/status.routes';
import { errorHandler } from './middlewares/error.handler';

startSecurityCleanup();
const app = express();

app.use(cors(securityConfig.cors));
app.use(helmet());
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(sanitizeInput(['description', 'comment', 'search']));
app.use(preventSQLInjection(['description', 'comment', 'search'], false)); // modo advertencia

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

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/status', statusRoutes);

setupSwagger(app);

// Error handler must be AFTER all other middleware and routes
app.use(errorHandler);

const port = process.env.PORT || 3000;

export { app };
