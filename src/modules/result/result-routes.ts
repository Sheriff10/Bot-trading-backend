import { Router } from "express"
import { ResultController } from "./result-controller";


const ResultRoute = Router();


ResultRoute.get("/trades/stats", ResultController.getUserTradeStats)

export default ResultRoute;