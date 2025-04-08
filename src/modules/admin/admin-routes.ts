import { Router } from "express";
import { AdminTransactionController } from "./admin-controller";

const adminRoutes = Router();

adminRoutes.get("/admin/deposits", AdminTransactionController.getPendingDeposits);
adminRoutes.get("/admin/withdrawals", AdminTransactionController.getPendingWithdrawals);
adminRoutes.get("/admin/stats", AdminTransactionController.stats);
adminRoutes.get("/admin/user-stats", AdminTransactionController.getUserStats);
adminRoutes.put("/admin/deposit/status", AdminTransactionController.updateDepositStatus);
adminRoutes.put("/admin/withdrawal/status", AdminTransactionController.updateWithdrawalStatus);
adminRoutes.put("/admin/fund-user", AdminTransactionController.fundUserBalance);
adminRoutes.put("/admin/change-roi", AdminTransactionController.updateWithdrawalStatus);

export default adminRoutes;
