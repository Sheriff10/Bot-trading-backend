import UserModel, { IUser } from "../../models/user-model"
import crypto from 'crypto';
import { notFoundResponse } from "../../utils/response-util";

interface TelegramUserData {
  id: number;
  username?: string;
  auth_date: number;
  hash: string;
}

export class TelegramAuthService {
  private static BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

  static async verifyTelegramLogin(data: TelegramUserData): Promise<boolean> {
    // Skip verification in development for easier testing
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    const dataCheckString = Object.keys(data)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => `${key}=${data[key as keyof TelegramUserData]}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256')
      .update(this.BOT_TOKEN)
      .digest();

    const hmac = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return hmac === data.hash;
  }

  static async findOrCreateUser(telegramData: TelegramUserData): Promise<IUser> {
    const isValid = await this.verifyTelegramLogin(telegramData);
    if (!isValid) {
      throw new Error('Invalid Telegram login data');
    }

    //  find existing user
    let user = await UserModel.findOne({ telegramId: telegramData.id });

    if (!user) {
      // Create new user with initial balances
      user = await UserModel.create({
        telegramId: telegramData.id,
        userName: telegramData.username || `user_${telegramData.id}`,
        coinBalance: 0,
        availableBalance: 0,
        operatingBalance: 0,
        completedTask: [],
        deposits: [],
        withdrawals: []
      });

      await user.save();
    }

    return user;
  }
}