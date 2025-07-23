import { Router } from "express";
import * as assignmentController from "../../controllers/tasks/assignment.controller";
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { assignUsersSchema, assignmentParamsSchema } from '../../schemas/assignment.schema';
import z from "zod";

const router = Router();

router.get('/', assignmentController.getAllAssignments);

router.get('/:taskId',
  validateRequest(z.object({ taskId: z.string().uuid() }), 'params'),
  assignmentController.getAssignmentsByTaskId
);

router.post('/:taskId',
  validateRequest(z.object({ taskId: z.string().uuid() }), 'params'),
  validateRequest(assignUsersSchema, 'body'),
  assignmentController.assignUsersToTask
);

router.delete('/:taskId/:userId',
  validateRequest(assignmentParamsSchema, 'params'),
  assignmentController.removeAssignment
);

router.delete('/:taskId',
  validateRequest(z.object({ taskId: z.string().uuid() }), 'params'),
  assignmentController.removeAllAssignments
);

router.get('/:taskId/:userId/check',
  validateRequest(assignmentParamsSchema, 'params'),
  assignmentController.isUserAssignedToTask
);

export default router;
