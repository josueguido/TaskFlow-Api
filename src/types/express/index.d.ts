import { JwtPayload } from "jsonwebtoken";
import { User } from "../../models/user.model";

export interface AuthUserPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export {};
