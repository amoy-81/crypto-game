import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/router";
import cors from "cors";

import TelegramBot from "node-telegram-bot-api";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db_url: any = process.env.DB_URL;

const bot_token: any = process.env.BOT_TOKEN;
const bot = new TelegramBot(bot_token, { polling: true });

bot.onText(/\/start(.+)?/, async (msg: any, match: any) => {
  const chatId = msg.chat.id;

  console.log(msg.from);

  const secretKeyJWT: any = process.env.BOT_JWT;
  const jwtCode = jwt.sign(msg.from, secretKeyJWT);

  const query = match[1] ? match[1].trim() : "null";

  const gameUrl = `${
    process.env.CLIENT_URL
  }/auth/register?token=${jwtCode}&il=${query ? query : "null"}`;

  console.log(gameUrl);

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play D-coiN",
            web_app: { url: gameUrl },
          },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    `Hi ${msg.from.first_name}, click the button below to open app:`,
    opts
  );
});

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
