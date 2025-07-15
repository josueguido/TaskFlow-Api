import { z } from "zod";

export interface IAssignment {
  task_id: number;
  user_id: number;
  assigned_at: string;
}

export interface ICreateAssignment {
  task_id: number;
  user_id: number;
}

export interface IUpdateAssignment {
  assignedAt?: Date;
}
