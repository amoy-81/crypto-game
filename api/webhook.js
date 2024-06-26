const TelegramBot = require("node-telegram-bot-api");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

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

module.exports = (request, response) => {
  try {
    console.log(request)
    response.json({m: "a"})
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send("OK");
};
