import express from "express";
import {isAuthMiddleware} from "../middlewares/isAuthMiddleware.js";
import {todosController} from "../controllers/todos.controller.js";

export const todoRoute = new express.Router();

todoRoute.get('/todos', isAuthMiddleware, todosController.getTodos);
todoRoute.post('/todos', isAuthMiddleware, todosController.createTodo);
todoRoute.put('/todos', isAuthMiddleware, todosController.updateTodo);
