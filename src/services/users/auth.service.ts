import { compare, hash, genSalt } from "bcryptjs";
import * as jwt from "../../utils/jwt";
import * as rtModel from "../../models/refreshToken.model";
import { pool } from "../../config/DB";
import { BadRequestError } from "../../errors/BadRequestError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export async function registerService(email: string, password: string, name: string) {
  const { rows } = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
  if (rows.length) throw new BadRequestError("Email ya registrado");

  const salt = await genSalt(10);
  const hashed = await hash(password, salt);

  await pool.query("INSERT INTO users (email, password_hash, name) VALUES ($1,$2,$3)", [email, hashed, name]);
  const { rows: u } = await pool.query("SELECT id,email,name FROM users WHERE email=$1", [email]);
  const user = u[0];

  const payload = { userId: user.id, email: user.email };
  const accessToken = jwt.generateAccessToken(payload);
  const refreshToken = jwt.generateRefreshToken(payload);

  // await rtModel.saveRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken, name: user.name };
}

export async function loginService(email: string, password: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];
  if (!user) throw new UnauthorizedError("Invalid credentials");

  const match = await compare(password, user.password_hash);
  if (!match) throw new UnauthorizedError("Invalid credentials");

  const payload = { userId: user.id, email: user.email };
  const accessToken = jwt.generateAccessToken(payload);
  const refreshToken = jwt.generateRefreshToken(payload);
  // await rtModel.saveRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken, name: user.name };
}

export async function refreshTokenService(token: string) {
  const found = await rtModel.findRefreshToken(token);
  if (found.rows.length === 0) throw new UnauthorizedError("Invalid refresh token");
  const payload = jwt.verifyRefreshToken(token);
  const newAccess = jwt.generateAccessToken({ userId: payload.userId, email: payload.email });
  return newAccess;
}

export async function logoutService(token: string) {
  await rtModel.deleteRefreshToken(token);
}
