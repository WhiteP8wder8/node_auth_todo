import {User} from "../models/user.js";


export const existUserMiddleware = async (req, res, next) => {
  const {email, password} = req.body;

  const existEmail = await User.findOne({ where: {email} });

  if(existEmail) {
    return res.status(400).json({ message: 'Email already exist' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password too short, enter 6 or more symbols' });
  }

  if (!email.includes('@')) {
    return res
      .status(400)
      .json({ message: 'Enter mail' });
  }

  next();
}
