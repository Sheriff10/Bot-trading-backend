import { Router } from 'express';
import { TransactionController } from './transaction-controller';

const transactionRoute = Router();


transactionRoute.post('/transactions/deposit', TransactionController.deposit);
transactionRoute.post('/transactions/withdraw', TransactionController.withdraw);
transactionRoute.get('/transactions/:userId', TransactionController.getUserTransactions )

export default transactionRoute;
