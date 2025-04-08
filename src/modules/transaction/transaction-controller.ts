import { Request, Response } from "express";
import { TransactionService } from "./transaction-service";
import response, { devResponse, errorResponse } from "../../utils/response-util";

export class TransactionController {
  static async deposit(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const { hash, chain, amount } = req.body;
      const deposit = await TransactionService.createDeposit({ userId, hash, chain, amount });
      return response(res, 200, deposit);
    } catch (error) {
      console.error("Error fetching signals:", error);
      return errorResponse(res);
    }
  }

  static async withdraw(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const { amount, chain, address } = req.body;
      const withdrawal = await TransactionService.createWithdrawal(userId as any, amount, chain, address);
      return devResponse(res, withdrawal);
    } catch (error) {
      console.error("Error fetching signals:", error);
      return errorResponse(res);
    }
  }

  static async getUserTransactions(req: Request, res: Response) {
    try {
      // const { userId } = req.params;
      const userId = req.session.userId;
      const { type } = req.query;

      if (type && type !== "deposit" && type !== "withdrawal") {
        return errorResponse(res, "Invalid type");
      }
      const transactions = await TransactionService.getUserTransactions(userId, type as "deposit" | "withdrawal");

      return response(res, 200, transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return errorResponse(res, "Could not fetch transactions");
    }
  }
}
