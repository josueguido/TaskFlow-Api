import { pool } from "../config/DB";
import { User } from "../interfaces/user.interface";

export const createUser = async (name: string, email: string, passwordHash: string, roleId = 3) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, passwordHash, roleId]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query(`SELECT id, name, email, role_id, created_at FROM users`);
  return result.rows;
};
