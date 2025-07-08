import { Router } from "express";
import * as taskController from "../../controllers/tasks/task.controller";
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import {
  createTaskSchema,
  updateTaskSchema,
  changeStatusSchema,
  assignUsersSchema,
} from '../../schemas/task.schema';

const router = Router();

router.get('/', taskController.getAllTasks);

router.post(
  '/',
  validateRequest(createTaskSchema),
  taskController.createTask
);

router.put(
  '/:id',
  validateRequest(updateTaskSchema),
  taskController.updateTask
);

router.patch(
  '/:id/status',
  validateRequest(changeStatusSchema),
  taskController.changetaskStatus
);

router.post(
  '/:id/assign',
  validateRequest(assignUsersSchema),
  taskController.assignUsersToTask
);

export default router;
