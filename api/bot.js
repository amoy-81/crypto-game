import { Telegraf } from "telegraf";
import jwt from "jsonwebtoken";
import { VercelRequest, VercelResponse } from "@vercel/node";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.onText(/\/start(.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;

  console.log(msg.from);

  const jwtCode = jwt.sign(msg.from, process.env.BOT_JWT);

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body, res);
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}

bot.launch();
