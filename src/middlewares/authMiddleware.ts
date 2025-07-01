import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { RequestHandler } from "express";
import { AuthUserPayload } from "../types/express";


export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token not provided" });
    return;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = decoded as AuthUserPayload;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
