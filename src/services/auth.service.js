import {User} from "../models/user.js";
import {mailService} from "./mail.service.js";


async function registration(name, email, password, activationToken) {
  await User.create({
    name,
    email,
    password,
    activationToken
  });

  await mailService.sendActivationEmail(email, activationToken);
}

export const authService = {
  registration,
}
