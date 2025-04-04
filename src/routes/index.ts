import { Router } from "express";
import routeNotFound from "../middleware/not-found";
import authRoute from "../modules/auth/auth-routes";

const router = Router();


router.use(authRoute);
router.use(routeNotFound);

export default router;
