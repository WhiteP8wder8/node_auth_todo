import {Todo} from "../models/todo.js";

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });

    return res.json(todos);
  } catch (e) {
    res.send(404).json('Can\'t find todos')
  }
}

const createTodo = async (req, res) => {
  const {title, description, status} = req.body;

  try {
    await Todo.create({
      title,
      description,
      status,
      userId: req.user.id
    });

    res.json('Todo was created!');
  } catch (e) {
    res.status(500).json('Server Error, can\'t create todo(');
  }
}

const updateTodo = async (req, res) => {
  const {id, title, description, status} = req.body;

  const todo = await Todo.findOne({ where: { id, userId: req.user.id } })

  if (!todo) {
    return res.status(404).json('Can\'t find todo');
  }

  try {
    await todo.update({
      title,
      description,
      status,
    });

    res.json('Todo was successfully updated!');
  } catch (e) {
    res.json('Ups... Somthing go wrond, please try later');
  }
}

export const todosController = {
  getTodos,
  createTodo,
  updateTodo
}
