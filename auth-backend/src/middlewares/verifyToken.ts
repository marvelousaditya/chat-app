import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//@ts-ignore
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized : No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    res.status(500).json({ error: "Unauthorized : wrong token provided" });
  }
};

export default verifyToken;
