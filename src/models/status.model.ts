import { pool } from "../config/DB";
import { IStatus } from "../interfaces/status.interface";

export const getAllStatuses = async () => {
  const result = await pool.query(`SELECT * FROM statuses`);
  return result.rows;
}

export const getStatusById = async (id: string): Promise<IStatus> => {
  const result = await pool.query(`SELECT * FROM statuses WHERE id = $1`, [id]);
  if (result.rows.length === 0) {
    throw new Error(`Status with id ${id} not found`);
  }
  return result.rows[0];
}

export const createStatus = async (name: string, order: number): Promise<IStatus> => {
  const result = await pool.query(
    `INSERT INTO statuses (name, order) VALUES ($1, $2) RETURNING *`,
    [name, order]
  );
  return result.rows[0];
}

export const updateStatus = async (id: number, name: string, order: string): Promise<IStatus> => {
  const result = await pool.query(
    `UPDATE statuses SET name = $1 WHERE id = $2 RETURNING *`,
    [name, order, id]
  );
  if (result.rows.length === 0) {
    throw new Error(`Status with id ${id} not found`);
  }
  return result.rows[0];
}

export const deleteStatus = async (id: number): Promise<IStatus> => {
  const result = await pool.query(`DELETE FROM statuses WHERE id = $1 RETURNING *`,
    [id]);
  if (result.rows.length === 0) {
    throw new Error(`Status with id ${id} not found`);
  }
  return result.rows[0];
}

