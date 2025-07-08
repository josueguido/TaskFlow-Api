import { pool } from "../config/DB";
import { ITask } from "../interfaces/task.interface";

export const getTasks = async () => {
  const query = `
    SELECT * FROM tasks
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const getTaskById = async (id: string) => {
  const query = `
    SELECT * FROM tasks WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const createTask = async (task: ITask) => {
  const query = `
    INSERT INTO tasks (title, description, status, assignedTo, createdAT)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [task.title, task.description, task.status, task.assignedTo, task.createdAt];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateTask = async (id: string, task: ITask) => {
  const query = `
    UPDATE tasks
    SET title = $1, description = $2, status = $3, assignedTo = $4
    WHERE id = $6
    RETURNING *
  `;
  const values = [task.title, task.description, task.status, task.assignedTo, id]
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTask = async (id: string) => {
  const query = `
    DELETE FROM tasks WHERE id = $1
    RETURNING *
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const changeTaskStatus = async (id: string, statusId: string) => {
  const query = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [statusId, id]);
  return result.rows[0];
};


export const assignUsers = async (taskId: string, userIds: string[]) => {
  const query = `
    UPDATE tasks
    SET assignedTo = $1
    WHERE id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [userIds, taskId]);
  return result.rows[0];
};

export const getHistoryByTaskId = async (taskId: string) => {
  const query = `
    SELECT * FROM task_history
    WHERE task_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [taskId]);
  return result.rows;
}

