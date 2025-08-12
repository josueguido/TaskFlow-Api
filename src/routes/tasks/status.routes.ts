import { Router } from "express";
import * as statusCtrl from "../../controllers/tasks/status.controller";
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import {statusIdSchema, createStatusSchema, updateStatusSchema} from '../../schemas/status.schema';
const router = Router();

router.get("/", statusCtrl.getAllStatuses);
router.get("/:id", validateRequest(statusIdSchema), statusCtrl.getStatusById);
router.post("/", validateRequest(createStatusSchema), statusCtrl.createStatus);
router.put("/:id", validateRequest(updateStatusSchema), statusCtrl.updateStatus);
router.delete("/:id", statusCtrl.deleteStatus);

export default router;
