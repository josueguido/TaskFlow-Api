import { app } from './app';
import { logger } from './utils/logger';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './config/DB/.env.production' : './config/DB/.env.dev' });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});