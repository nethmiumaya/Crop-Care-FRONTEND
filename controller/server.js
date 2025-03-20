import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import staffController from "./Controller/Controller.js";

const app = express();
const port = 5050;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use("/main/api/v1", staffController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
