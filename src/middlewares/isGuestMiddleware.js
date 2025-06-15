import jwt from "jsonwebtoken";

export const isGuestMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next();
  }

  try {
    jwt.verify(token, process.env.JWT_REFRESHKEY);

    return res.status(403).json({ message: 'Already authenticated' });
  } catch (e) {
    return next();
  }
}
