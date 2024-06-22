import express from "express";
import "dotenv/config";
import { dbConnection } from "./src/DB/connection.js";
import usersRouter from "./src/modules/users/users.routes.js";
import carsRouter from "./src/modules/cars/cars.routes.js";
import rentalsRouter from "./src/modules/rentals/rentals.routes.js";

const app = express();

app.use(express.json());

app.use("/user", usersRouter);
app.use("/cars", carsRouter);
app.use("/rentals", rentalsRouter);

dbConnection();

app.get("/", (req, res) => res.json({ message: "Hello World!" }));
app.listen(process.env.PORT, () =>
  console.log("Server Connected Successfully")
);
