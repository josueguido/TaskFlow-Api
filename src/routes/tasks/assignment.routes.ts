import { Router } from "express";
import * as assignmentController from "../../controllers/tasks/assignment.controller";
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { assignUsersSchema, assignmentParamsSchema, taskIdSchema } from '../../schemas/assignment.schema';

const router = Router();

router.get('/', assignmentController.getAllAssignments);

router.get('/:taskId',
  validateRequest(taskIdSchema, 'params'),     // ✅ solo taskId
  assignmentController.getAssignmentsByTaskId
);

router.post('/:taskId',
  (req, res, next) => {
    try {
      validateRequest(taskIdSchema, 'params')(req, res, (err) => {
        if (err) return next(err);
        validateRequest(assignUsersSchema, 'body')(req, res, (err2) => {
          if (err2) return next(err2);
          assignmentController.assignUsersToTask(req, res, next);
        });
      });
    } catch (error) {
      // Ensure any thrown error is passed to Express error handler
      next(error);
    }
  }
);

router.delete('/:taskId',
  validateRequest(taskIdSchema, 'params'),     // ✅ solo taskId
  assignmentController.removeAllAssignments
);

// ✅ Para rutas con ambos IDs
router.delete('/:taskId/:userId',
  validateRequest(assignmentParamsSchema, 'params'),
  assignmentController.removeAssignment
);

router.get('/:taskId/:userId/check',
  validateRequest(assignmentParamsSchema, 'params'),
  assignmentController.isUserAssignedToTask
);


export default router;
