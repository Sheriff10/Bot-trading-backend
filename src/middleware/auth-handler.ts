import { Request, Response, NextFunction } from "express";
import JWTService from "../services/jwt-service";
import response from "../utils/response-util";

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  const exemptRoutes = ["/bot"];
  if (exemptRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }

  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header must be in the format: Bearer <token>" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    const jwtService = new JWTService();
    const { verifyAccessToken } = jwtService;
    const decode = verifyAccessToken(token);
    if (!decode) return response(res, 401, "Invalid access token or expired");
    req.user = decode;
    req.session = {
      telegramId: decode.telegramId,
      userId: decode.userId,
    };
    next();
  } catch (error) {
    return response(res, 401, "JWT token Invalid");
  }
};

export default authHandler;
