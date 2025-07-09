import { pool } from "../config/DB";
import { ITask } from "../interfaces/task.interface";

export const getTasks = async () => {
  const result = await pool.query(`
    SELECT * FROM tasks
  `);
  return result.rows;
};

export const getTaskById = async (id: string) => {
  const result = await pool.query(`
    SELECT * FROM tasks WHERE id = $1
  `, [id]);
  if (result.rows.length === 0) {
    throw new Error(`Task with id ${id} not found`);
  }
  return result.rows[0];
};

export const createTask = async (task: ITask) => {
  const result = await pool.query(`
    INSERT INTO tasks (title, description, status, assignedTo, createdAT)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [task.title, task.description, task.status, task.assignedTo, task.createdAt]
  );
  return result.rows[0];
};

export const updateTask = async (id: string, task: ITask) => {
  const result = await pool.query(`
    UPDATE tasks
    SET title = $1, description = $2, status = $3, assignedTo = $4
    WHERE id = $5
    RETURNING *
  `, [task.title, task.description, task.status, task.assignedTo, id],
  );

  if (result.rows.length === 0) {
    throw new Error(`Tasks with id ${id} not found`);
  }
  return result.rows[0];
};

export const deleteTask = async (id: string) => {
  const result = await pool.query(`
    DELETE FROM tasks WHERE id = $1
  RETURNING *`, [id]);
  if (result.rows.length === 0) {
    throw new Error(`Task with id ${id} not found`);
  }
  return result.rows[0];
};

export const changeTaskStatus = async (id: string, statusId: string) => {
  const result = await pool.query(`
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *
  `, [statusId, id]);
  if (result.rows.length === 0) {
    throw new Error(`Status with id ${statusId} not found`);
  }
  return result.rows[0];
};

export const assignUsers = async (taskId: string, userIds: string[]) => {
  const result = await pool.query(`
    UPDATE tasks
    SET assignedTo = $1
    WHERE id = $2
    RETURNING *
  `, [userIds, taskId]);
  if (result.rows.length === 0) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  return result.rows[0];
};

export const getHistoryByTaskId = async (taskId: string) => {
  const result = await pool.query(`
    SELECT * FROM task_history
    WHERE task_id = $1
    ORDER BY created_at DESC
  `, [taskId]);
  if (result.rows.length === 0) {
    throw new Error(`No history found for task with id ${taskId}`);
  }
  return result.rows;
}

