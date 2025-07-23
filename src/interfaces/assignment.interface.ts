export interface IAssignment {
  task_id: number;
  user_id: number;
  assigned_at: Date;
  user_name?: string;      // Datos del JOIN
  user_email?: string;     // Datos del JOIN
  task_title?: string;     // Datos del JOIN
  task_description?: string; // Datos del JOIN
}
export interface ICreateAssignment {
  task_id: number;
  user_id: number;
}

export interface IUpdateAssignment {
  assigned_at?: Date;
}
