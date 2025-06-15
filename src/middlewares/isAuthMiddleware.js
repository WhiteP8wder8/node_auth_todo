import {jwtService} from "../services/jwt.service.js";

export const isAuthMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    req.user = jwtService.verifyRefreshToken(token);

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
