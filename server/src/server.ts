import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import "./database";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});
