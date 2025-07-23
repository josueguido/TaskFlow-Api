import Router from 'express';
import * as taskHistoryController from "../../controllers/tasks/taskHistory.controller";
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { taskHistorySchema, createTaskHistorySchema } from '../../schemas/taskHistory.schema';

const router = Router();


export default router;
