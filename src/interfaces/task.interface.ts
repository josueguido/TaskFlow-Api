export interface ITask {
  title: string;
  description?: string;
  status: string;
  assignedTo: number[];
  createdAt: Date;
}

export interface ICreateTaskInput {
  title: string;
  description?: string;
  status: string;
  assignedTo: number[];
  createdAt: Date;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  status: string;
  assignedTo?: number[];
}
