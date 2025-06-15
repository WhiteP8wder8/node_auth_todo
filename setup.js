import {client} from "./src/utils/db.js";
import {User} from "./src/models/user.js";
import {Todo} from "./src/models/todo.js";

client.sync({
  force: true,
});
