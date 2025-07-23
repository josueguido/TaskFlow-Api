import { RequestHandler } from "express";
import * as statusService from "../../services/tasks/status.service";

export const getAllStatuses: RequestHandler = async (req, res, next) => {
  try {
    const statuses = await statusService.getStatuses();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
}

export const getStatusById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await statusService.getStatusByIdService(id);
    res.json(status);
  } catch (error) {
    next(error);
  }
}

export const createStatus: RequestHandler = async (req, res, next) => {
  try {
    const { name, order } = req.body;
    const status = await statusService.createStatusService({ name, order });
    res.status(201).json(status);
  } catch (error) {
    next(error);
  }
}

export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, order } = req.body;
    const status = await statusService.updateStatusService(Number(id), { name, order });
    res.json(status);
  } catch (error) {
    next(error);
  }
}

export const deleteStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = await statusService.deleteStatusService(Number(id));
    res.json(status);
  } catch (error) {
    next(error);
  }
}
