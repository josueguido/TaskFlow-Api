export interface ITask {
  title: string;
  description?: string;
  status_id: number;
  created_at: Date;
}

export interface ICreateTaskInput {
  title: string;
  description?: string;
  status_id: number;
  created_at: Date;
}

export interface IUpdateTaskInput {
  title?: string;
  description?: string;
  status_id?: number;
}
