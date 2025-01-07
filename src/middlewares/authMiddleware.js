import jwt from "jsonwebtoken";
import { checkRecordExists } from "../utils/sqlFunctions.js";

export const requiresAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.user_id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await checkRecordExists("users", "user_id", decoded.user_id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    delete req.user.password;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token verification failed" });
  }
};
