// src/routes/auth.routes.ts
import {Router} from 'express';
import { AuthController } from './auth-controller';

const authRoute = Router();

authRoute.post('/auth/telegram', AuthController.telegramLogin);
authRoute.get('/users/:userId', AuthController.getUserById);
authRoute.get('/users/:userId/stats', AuthController.getUserStats);
authRoute.get("/check-user/:telegramId", AuthController.checkUserExists);
// abcd
export default authRoute;