import UserModel from "../../models/user-model";
import bot from "../config/bot";

bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const referral = match && match[1] ? match[1] : null;
  const telegramId = msg.from?.id;
  if (!telegramId) return;

  let message = `🚀 *Welcome to Evohive Bot!* 🐝\n\nReady to earn, refer, and grow your hive?\nTap below to launch the app and start mining! ⛏️✨`;

  const options = {
    reply_markup: {
      inline_keyboard: [[{ text: "Launch app", web_app: { url: "https://ai-trading-bot.netlify.app/" } }]],
    },
  };

  const existingUser = await UserModel.findOne({ telegramId });
  if (existingUser) return bot.sendMessage(chatId, message, options);

  const newUser = new UserModel({
    userName: msg?.from?.username || msg?.from?.first_name || `user_${telegramId}`,
    telegramId,
  });
  await newUser.save();

  if (referral) {
    const inviterTelegramId = Number(referral);
    const inviter = await UserModel.findOne({ telegramId: inviterTelegramId });

    if (inviter) {
      newUser.upline = inviter._id as any;
      await newUser.save();
      inviter.invites.push(newUser._id as any);
      await inviter.save();
    }
  }

  bot.sendMessage(chatId, message, options);
});
