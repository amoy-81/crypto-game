const telegramBot = require("node-telegram-bot-api");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = process.env.BOT_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.onText(/\/start(.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;

  console.log(msg.from);

  const jwtCode = jwt.sign(msg.from, process.env.BOT_JWT);

  const query = match[1] ? match[1].trim() : "";

  const gameUrl = `https://shop-manager-client.vercel.app?token=${jwtCode}&il=${query}`;

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

// bot.onText("/new", (msg) => {
//   console.log(msg);
//   const chatId = msg.chat.id;

//   const opts = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "Play Game",
//             web_app: { url: gameUrl },
//           },
//         ],
//       ],
//     },
//   };

//   bot.sendMessage(chatId, "Click the button below to play the game:", opts);
// });
