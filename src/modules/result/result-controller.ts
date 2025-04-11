import { Request, Response } from "express";
import response, { badReqResponse, devResponse, errorResponse } from "../../utils/response-util";
import { ResultService } from "./result-service";

export class ResultController {
  static async getUserTradeStats(req: Request, res: Response) {
    try {
      const userId = req.session.userId;
      const { chain, fromDate, toDate } = req.query;

      const data = await ResultService.getUserTradeStats(userId, {
        chain: chain as string,
        fromDate: fromDate as string,
        toDate: toDate as string,
      });

      return response(res, 200, data);
    } catch (err) {
      console.error("Error getting user trade stats:", err);
      return errorResponse(res, "Failed to fetch trade statistics");
    }
  }

  static async getAllResults(req: Request, res: Response) {
    try {
      const results = await ResultService.getAllResults();
      return devResponse(res, results);
    } catch (err) {
      console.error("Error fetching all results:", err);
      return errorResponse(res, "Failed to fetch results");
    }
  }

  static async getUserResults(req: Request, res: Response) {
    try {
      const userId = req.session.userId;

      if (!userId) {
        return badReqResponse(res, "User ID not provided");
      }

      const results = await ResultService.getResultsByUser(userId);
      return response(res, 200, results);
    } catch (err) {
      console.error("Error fetching user results:", err);
      return errorResponse(res, "Failed to fetch user results");
    }
  }
}
