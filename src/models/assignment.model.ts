import { pool } from "../config/DB";
import { IAssignment } from '../interfaces/assignment.interface';
import { NotFoundError } from '../errors/NotFoundError';

export const getAssignments = async () => {
  const result = await pool.query(`
    SELECT
      a.task_id,
      a.user_id,
      a.assigned_at,
      u.name as user_name,
      u.email as user_email,
      t.title as task_title,
      t.description as task_description
    FROM assignments a
    JOIN users u ON a.user_id = u.id
    JOIN tasks t ON a.task_id = t.id
    ORDER BY a.assigned_at DESC
  `);
  return result.rows;
}

export const getAssignmentsByTaskId = async (taskId: string) => {
  const taskIdNum = parseInt(taskId, 10);
  if (isNaN(taskIdNum)) {
    throw new Error('Invalid task ID format');
  }

  const result = await pool.query(`
    SELECT
      a.task_id,
      a.user_id,
      a.assigned_at,
      u.name as user_name,
      u.email as user_email
    FROM assignments a
    JOIN users u ON a.user_id = u.id
    WHERE a.task_id = $1
    ORDER BY a.assigned_at DESC
  `, [taskIdNum]);

  return result.rows;
}

export const assignUsersToTask = async (taskId: string, userIds: string[]) => {
  const taskIdNum = parseInt(taskId, 10);
  if (isNaN(taskIdNum)) {
    throw new Error('Invalid task ID format');
  }

  const userIdNums = userIds.map(id => {
    const num = parseInt(id, 10);
    if (isNaN(num)) {
      throw new Error(`Invalid user ID format: ${id}`);
    }
    return num;
  });

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Verificar que la tarea existe
    const taskCheck = await client.query('SELECT id FROM tasks WHERE id = $1', [taskIdNum]);
    if (taskCheck.rows.length === 0) {
      throw new NotFoundError('Task not found');
    }

    // Verificar que los usuarios existen
    const usersCheck = await client.query(
      'SELECT id FROM users WHERE id = ANY($1)',
      [userIdNums]
    );

    if (usersCheck.rows.length !== userIdNums.length) {
      throw new NotFoundError('One or more users not found');
    }

    // Remover asignaciones existentes para evitar duplicados
    await client.query(
      'DELETE FROM assignments WHERE task_id = $1 AND user_id = ANY($2)',
      [taskIdNum, userIdNums]
    );

    // Insertar nuevas asignaciones
    const values = userIdNums.map((_, i) => `($1, $${i + 2}, NOW())`).join(", ");
    const params = [taskIdNum, ...userIdNums];

    const query = `
      INSERT INTO assignments (task_id, user_id, assigned_at)
      VALUES ${values}
      RETURNING *
    `;

    const result = await client.query(query, params);
    await client.query('COMMIT');

    return result.rows;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
