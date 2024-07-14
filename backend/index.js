import { config } from "dotenv";
import databaseConnection from "./database/connection.js";
import { app } from "./app.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The app is listening on the port ${port}`);
});

databaseConnection();
