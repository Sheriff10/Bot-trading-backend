import TelegramBot from "node-telegram-bot-api";
import secret from "../../config/secret-config";

const bot = new TelegramBot(secret.TELEGRAM_BOT_TOKEN, { polling: false });

// Replace with your actual server domain
const url = secret.WEBHOOK;
const webhookPath = `/bot${secret.TELEGRAM_BOT_TOKEN}`;

bot
  .setWebHook(`${url}${webhookPath}`)
  .then(() => {
    console.log("Webhook has been set successfully!");
  })
  .catch((err: Error) => {
    console.error("Error setting webhook:", err);
  });

export default bot;
