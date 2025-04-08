import { Router } from "express";
import routeNotFound from "../middleware/not-found";
import authRoute from "../modules/auth/auth-routes";
import signalRoute from "../modules/signal/signal-routes";
import transactionRoute from "../modules/transaction/transaction-routes";
import taskRoute from "../modules/task/task-routes";
import ResultRoute from "../modules/result/result-routes";

const router = Router();


router.use(authRoute);
router.use(signalRoute);
router.use(transactionRoute);
router.use(taskRoute);
router.use(ResultRoute);
router.use(routeNotFound);

export default router;
