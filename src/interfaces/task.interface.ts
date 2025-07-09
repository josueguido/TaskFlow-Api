import { z } from 'zod';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

export interface ITask {
  title: string;
  description?: string;
  status: string;
  assignedTo: string[];
  createdAt: Date;
}

export interface ICreateTaskInput {
  title: string;
  description?: string;
  status: string;
  assignedTo: string[];
  createdAt: Date;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  status: string;
  assignedTo?: string[];
}
