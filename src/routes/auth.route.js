import express from "express";
import {authController} from "../controllers/auth.controller.js";
import {isGuestMiddleware} from "../middlewares/isGuestMiddleware.js";
import {existUserMiddleware} from "../middlewares/ExistUserMiddleware.js";
import {isAuthMiddleware} from "../middlewares/isAuthMiddleware.js";


export const authRoute = new express.Router();

authRoute.post('/registration', isGuestMiddleware, existUserMiddleware, authController.registration);
authRoute.get('/registration/:activationToken', isGuestMiddleware, authController.activation);
authRoute.post('/login', isGuestMiddleware, authController.login);
authRoute.post('/logout', isAuthMiddleware, authController.logout);

authRoute.post('/reset-password', isGuestMiddleware, authController.sendNewPassEmail);
authRoute.put('/reset-password/:resetToken', isGuestMiddleware, authController.changePassword);
