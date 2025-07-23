import { pool } from "../config/DB";
import { IRole } from "../interfaces/role.interface";

export const getAllRoles = async () => {
  const result = await pool.query(`SELECT * FROM roles`);
  return result.rows as IRole[];
}

export const getRoleById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM roles WHERE id = $1`, [id]);
  return result.rows[0] as IRole;
}
