import { Router } from "express";
import routeNotFound from "../middleware/not-found";
import authRoute from "../modules/auth/auth-routes";
import signalRoute from "../modules/signal/signal-routes";
import transactionRoute from "../modules/transaction/transaction-routes";

const router = Router();


router.use(authRoute);
router.use(signalRoute)
router.use(transactionRoute);
router.use(routeNotFound);

export default router;
