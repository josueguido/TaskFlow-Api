import { RequestHandler } from "express";
import * as taskService from "../../services/tasks/task.service";
import { BadRequestError } from "../../errors/BadRequestError";
import { validateUUID, validateUUIDs } from "../../utils/validators";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export const getTaskById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Task ID is required");
    }
    validateUUID(id, 'Task ID');

    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    const task = await taskService.createTask({ title, description, status, assignedTo, createdAt: new Date() });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;
    const task = await taskService.updateTask(id, { title, description, status, assignedTo });
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export const changetaskStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statusId } = req.body;
    const task = await taskService.changeTaskStatus(id, statusId);
    res.json(task);
  } catch (error) {
    next(error);
  }
}

export const assignUsersToTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    validateUUID(id, 'Task ID');
    validateUUIDs(userIds, 'User IDs');

    const result = await taskService.assignUsersToTask(id, userIds);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const getTaskHistory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await taskService.getTaskHistory(id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}
