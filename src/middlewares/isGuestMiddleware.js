import {jwtService} from "../services/jwt.service.js";

export const isGuestMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next();
  }

  try {
    jwtService.verifyRefreshToken(token);

    return res.status(403).json({ message: 'Already authenticated' });
  } catch (e) {
    return next();
  }
}
