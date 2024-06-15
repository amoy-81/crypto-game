import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/router";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db_url: any = process.env.DB_URL;

mongoose
  .connect(db_url)
  .then((res: any) => console.log("db connect"))
  .catch((err: any) => console.log(err));

// json in body
app.use(express.json());

app.use("/api", router);

// // start mining
// app.get("/start-record", async (req: Request, res: any) => {
//   // const now = new Date().getTime();

//   const newMine = await Mine.create({ user: "666dd8a1b256e8be51c7312f" });

//   return res.status(200).json({ newMine });
// });

// // my records
// app.get("/records", async (req: Request, res: any) => {
//   // const now = new Date().getTime();
//   console.log(User.modelName);
//   console.log(Mine.name);
//   const users = await User.find();

//   const mines = await Mine.find().populate("user");

//   return res.status(200).json({ mines });
// });

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
