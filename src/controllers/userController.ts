import { NextFunction, Request, RequestHandler, Response } from "express";
import * as userService from "../services/userService";
import bcrypt from "bcryptjs";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userService.registerUser(name, email, passwordHash);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
