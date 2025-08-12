import { Request, Response, NextFunction } from "express";
import * as authService from "../../services/users/auth.service";
import { BadRequestError } from '../../errors/BadRequestError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      throw new BadRequestError('Email, password y username son requeridos');
    }
    const data = await authService.registerService(email, password, username);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email y password son requeridos');
    }

    const data = await authService.loginService(email, password);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body; // CORREGIDO: era 'token'

    if (!refreshToken) {
      throw new BadRequestError('Refresh token es requerido');
    }

    const accessToken = await authService.refreshTokenService(refreshToken); // CORREGIDO
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body; // CORREGIDO: era 'token'

    if (!refreshToken) {
      throw new BadRequestError('Refresh token es requerido');
    }

    await authService.logoutService(refreshToken); // CORREGIDO
    res.json({ message: "Logout exitoso" });
  } catch (err) {
    next(err);
  }
};
