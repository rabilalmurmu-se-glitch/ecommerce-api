import express from "express";
import cors from "cors";
import { config, validateENV } from "./config/config.js";
import router from "./router/main.js";
import { connectDB } from "./config/db.connect.js";

validateENV();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.listen(config.app.port, () => {
  console.log(
    `🚀 Server running on port ${config.app.port} in ${config.app.env} mode`
  );
});
