import express from "express";
import {authController} from "../controllers/auth.controller.js";


export const authRoute = new express.Router();

authRoute.post('/registration', authController.registration);
authRoute.get('/registration/:activationToken', authController.activation);
authRoute.post('/login', authController.login);
