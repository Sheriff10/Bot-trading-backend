import { Request, Response } from 'express';
import { TransactionService } from './transaction-service';
import { devResponse, errorResponse } from '../../utils/response-util';

export class TransactionController {
  static async deposit(req: Request, res: Response) {
    try {
      const { userId, hash, chain, amount } = req.body;
      const deposit = await TransactionService.createDeposit({userId, hash, chain, amount});
      return devResponse(res, deposit);
    } catch (error) {
    console.error('Error fetching signals:', error);
      return errorResponse(res);
    }
  }

  static async withdraw(req: Request, res: Response) {
    try {
      const { userId, amount, chain } = req.body;
      const withdrawal = await TransactionService.createWithdrawal(userId, amount, chain);
      return devResponse(res, withdrawal);
    } catch (error) {
    console.error('Error fetching signals:', error);
      return errorResponse(res);
    }
  }

  static async getUserTransactions(req: Request, res: Response){
  try {
    const { userId } = req.params;

    const transactions = await TransactionService.getUserTransactions(userId);

    return devResponse(res, transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return errorResponse(res, "Could not fetch transactions");
  }
}
}