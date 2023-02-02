import path from "path";
import { fileURLToPath } from "url";
// configure path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./config.env") });

// spin server
import app from "./app.js";
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Quizz on port : ${port}`);
});

// database connection
