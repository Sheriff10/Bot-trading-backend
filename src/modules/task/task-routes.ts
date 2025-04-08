import { Router } from "express"
import { TaskController } from "./task-controller";
import authHandler from "../../middleware/auth-handler";

 const taskRoute = Router();

taskRoute.post("/tasks", TaskController.createTask);


taskRoute.use(authHandler) 
taskRoute.post("/complete-task/:taskId", TaskController.completeTask)

export default taskRoute;