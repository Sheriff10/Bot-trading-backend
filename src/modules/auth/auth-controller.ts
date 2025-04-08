import { Request, Response } from "express";
import { TelegramAuthService } from "./auth-service";
import JWTService from "../../services/jwt-service";
import response, { devResponse, errorResponse, notFoundResponse } from "../../utils/response-util";
import UserModel from "../../models/user-model";
import DepositModel from "../../models/deposit-model";
import WithdrawalModel from "../../models/withdrawal-model";
import TaskModel from "../../models/task-model";

void DepositModel;
void WithdrawalModel;
void TaskModel;

export class AuthController {
  static async telegramLogin(req: Request, res: Response) {
    try {
      const telegramData = req.body;

      if (!telegramData.id) {
        return res.status(400).json({ success: false, error: "Invalid Telegram data" });
      }

      const user = await TelegramAuthService.findOrCreateUser(telegramData);
      const jwtService = new JWTService();
      const accessToken = jwtService.createAccessToken({ telegramId: user.telegramId, userId: user._id });
      const refreshToken = jwtService.createRefreshToken({ telegramId: user.telegramId, userId: user._id });

      // Return user data (excluding sensitive fields)
      const userData = {
        id: user._id,
        telegramId: user.telegramId,
        userName: user.userName,
        coinBalance: user.coinBalance,
        availableBalance: user.availableBalance,
        operatingBalance: user.operatingBalance,
      };
      return devResponse(res, { accessToken, refreshToken, userData });
    } catch (error) {
      console.log("Error in authencate controller ", error);
      return errorResponse(res);
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      console.log(req.session);
      const userId = req.session.userId;

      const user = await UserModel.findById(userId).select(
        "userName telegramId coinBalance availableBalance operatingBalance deposits withdrawal createdAt updatedAt"
      );

      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      return response(res, 200, user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return errorResponse(res, "Failed to fetch user");
    }
  }

  static async getUserStats(req: Request, res: Response) {
    try {
      // const { userId } = req.params;
      const userId = req.session.userId;

      const user = await UserModel.findById(userId)
        .populate("deposits withdrawals completedTask")
        .select("coinBalance availableBalance operatingBalance completedTask deposits withdrawals");

      if (!user) {
        return notFoundResponse(res, "User not found");
      }

      const stats = {
        totalCompletedTasks: user.completedTask.length,
        totalDeposits: user.deposits.length,
        totalWithdrawals: user.withdrawals.length,
        coinBalance: user.coinBalance,
        availableBalance: user.availableBalance,
        operatingBalance: user.operatingBalance,
      };

      return devResponse(res, stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return errorResponse(res);
    }
  }

  static async checkUserExists(req: Request, res: Response) {
    try {
      const { telegramId } = req.params;

      const exists = await TelegramAuthService.checkUserExistsByTelegramId(Number(telegramId));

      return devResponse(res, { exists });
    } catch (error) {
      console.error("Error checking user existence:", error);
      return errorResponse(res, "Failed to check user");
    }
  }

    static async getCompletedTasks(req: Request, res: Response) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return errorResponse(res, "User not authenticated");
      }

      const tasks = await TelegramAuthService.getCompletedTasks(userId)
      return devResponse(res, tasks);
    } catch (error: any) {
      return errorResponse(res, error.message || "Could not fetch completed tasks");
    }
  }
}
