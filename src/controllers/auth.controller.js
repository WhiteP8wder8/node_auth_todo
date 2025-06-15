import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {authService} from "../services/auth.service.js";
import {User} from "../models/user.js";
import {jwtService} from "../services/jwt.service.js";

const registration = async (req, res) => {
  const {name, email, password} = req.body;

  const user = await User.findOne({ where: {email} });

  if(user) {
    return res.send({ message: 'You are already registred' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const activationToken = uuidv4();

  await authService.registration(name, email, hashedPassword, activationToken);

  res.send({ message: 'OK' });
}

const activation = async (req, res) => {
  const {activationToken} = req.params;
  const token = await User.findOne({where: {activationToken}});

  if(!token) {
    return res.sendStatus(404);
  }

  token.activationToken = null;
  await token.save();

  res.send({ message: 'Account was activated! Redirect to login page'});
}

const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({ where: {email} });

  if(!user) {
    return res.status(401).json({ message: 'Wrong mail or password' });
  }

  if(user.activationToken !== null) {
    return res
      .status(403)
      .json({ message: 'Please activate your email before login' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Wrong mail or password' });
  }

  generateToken(res, user)
}

const generateToken = (res, user) => {
  const accessToken = jwtService.sign(user);
  const refreshToken = jwtService.refreshSign(user);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    user: user.email,
    accessToken: accessToken,
    message: 'Redirect to profile page',
  });
}

const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true
  });

  res.send({ message: 'Logged out successfully' });
}

export const authController = {
  registration,
  activation,
  login,
  logout
}
