import {DataTypes} from 'sequelize';
import {client} from "../utils/db.js";

export const Todo = client.define('todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});
