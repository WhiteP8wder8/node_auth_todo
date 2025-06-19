import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {authRoute} from "./routes/auth.route.js";
import {todoRoute} from "./routes/todo.route.js";
import {pageNotFound} from "./error/pageNotFound.js";

const app = express();

const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(authRoute);
app.use(todoRoute);
app.use(pageNotFound);

app.listen(PORT, () => {
  console.log(`Server was started! on port ${PORT}`);
});
