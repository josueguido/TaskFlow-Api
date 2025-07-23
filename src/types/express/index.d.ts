import { JwtPayload } from "jsonwebtoken";
import { User } from "../../models/user.model";

export interface AuthUserPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role: string;
      }
    }
  }
}

export {};
