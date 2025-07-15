import { pool } from "../config/DB";
import { IAssignment } from '../interfaces/assignment.interface';
import { NotFoundError } from '../errors/NotFoundError';

export const getAssignments = async () => {
  const result = await pool.query(`
    SELECT * FROM assignments
  `);
  return result.rows;
}

export const getAssignmentsByTaskId = async (taskId: string) => {
  const result = await pool.query(`
    SELECT * FROM assignments WHERE task_id = $1;
  `, [taskId]);
  if (result.rows.length === 0) {
    throw new NotFoundError(`Assignment with task_id ${taskId} not found`);
  }
  return result.rows[0];
}

export const assignUsersToTask = async (taskId: string, userIds: string[]) => {
  const values = userIds.map((_, i) => `($1, $${i + 2}, NOW())`).join(", ");
  const params = [taskId, ...userIds];

  const query = `
    INSERT INTO assignments (task_id, user_id, assigned_at)
    VALUES ${values}
    RETURNING *
  `;

  const result = await pool.query(query, params);
  return result.rows;
};


export const removeAssignment = async (taskId: string, userId: string) => {
  const result = await pool.query(`
    DELETE FROM assignments WHERE task_id = $1 AND user_id = $2 RETURNING *
  `, [taskId, userId]);
  if (result.rows.length === 0) {
    throw new NotFoundError(`Assignment with task_id ${taskId} and user_id ${userId} not found`);
  }
  return result.rows[0];
}

export const removeAllAssignments = async (taskId: string): Promise<any[]> => {
  const result = await pool.query(`
    DELETE FROM assignments WHERE task_id = $1 RETURNING *
  `, [taskId]);
  if (result.rows.length === 0) {
    throw new NotFoundError(`No assignments found for task_id ${taskId}`);
  }
  return result.rows;
}


export const isUserAssignedToTask = async (taskId: string, userId: string): Promise<boolean> => {
  const result = await pool.query(`
    SELECT * FROM assignments WHERE task_id = $1 AND user_id = $2
  `, [taskId, userId]);
  return result.rows.length > 0;
}
