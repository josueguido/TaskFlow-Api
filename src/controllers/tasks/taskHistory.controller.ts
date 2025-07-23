import { RequestHandler } from "express";
import { BadRequestError } from "../../errors/BadRequestError";
import { validateUUID, validateUUIDs } from "../../utils/validators";
import * as taskHistoryService from "../../services/tasks/taskHistory.service";


export const getTaskHistory: RequestHandler = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    validateUUID(taskId, 'Task ID');

    const history = await taskHistoryService.getTaskHistoryService(taskId);
    res.json(history);
  } catch (error) {
    next(error);
  }
}

// export const createTaskHistory: RequestHandler = async (req, res, next) => {
//   try {
//     const data: ICreateTaskHistory = req.body;
//     const history = await taskHistoryService.createTaskHistoryService(data);
//     res.status(201).json(history);
//   } catch (error) {
//     next(error);
//   }
// }
