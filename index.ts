import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/router";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db_url: any = process.env.DB_URL;

mongoose
  .connect(db_url)
  .then((res: any) => console.log("db connect"))
  .catch((err: any) => console.log(err));

app.use(cors({ origin: "*" }));

// json in body
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
