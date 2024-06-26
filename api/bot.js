import { Telegraf } from "telegraf";
import jwt from "jsonwebtoken";



export default async function handler(req, res) {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body, res);
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}

bot.launch();
