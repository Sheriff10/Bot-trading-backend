import ResultModel from "../../models/result-model";
import SignalModel from "../../models/signal-model";
import mongoose from "mongoose";

export class ResultService {
  static async getUserTradeStats(userId: string, filters: { fromDate?: string; toDate?: string }) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const { fromDate, toDate } = filters;

    const dateFilter: any = {};
    if (fromDate) dateFilter.$gte = new Date(fromDate);
    if (toDate) dateFilter.$lte = new Date(toDate);

    const resultQuery: any = { userId: userObjectId };
    if (Object.keys(dateFilter).length > 0) {
      resultQuery.createdAt = dateFilter;
    }

    const results = await ResultModel.find(resultQuery).lean();

    const totalTrades = results.length;

    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const trades24h = results.filter((r) => new Date(r.createdAt) >= last24Hours);
    const volume24h = trades24h.reduce((sum, r) => sum + (r.amount || 0), 0).toFixed(2);

    const openInterest = results.filter((r) => r.roiPercentage === 0).length;

    return {
      totalTrades,
      volume24h,
      openInterest,
    };
  }

  static async getAllResults() {
    return ResultModel.find().populate("userId taskId").sort({ date: -1 });
  }

  static async getResultsByUser(userId: string) {
    return ResultModel.find({ userId }).populate("taskId").sort({ date: -1 });
  }
}
