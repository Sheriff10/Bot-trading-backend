import ResultModel from "../../models/result-model";
import SignalModel from "../../models/signal-model";
import mongoose from "mongoose";

export class ResultService {
  static async getUserTradeStats(userId: string, filters: { chain?: string; fromDate?: string; toDate?: string }) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const { chain, fromDate, toDate } = filters;

    const dateFilter: any = {};
    if (fromDate) dateFilter.$gte = new Date(fromDate);
    if (toDate) dateFilter.$lte = new Date(toDate);

    const resultQuery: any = { userId: userObjectId };
    if (Object.keys(dateFilter).length) resultQuery.createdAt = dateFilter;

    const results = await ResultModel.find(resultQuery).lean();

    const signalIds = results.map((r) => r.taskId);
    const signals = await SignalModel.find({ _id: { $in: signalIds } }).lean();

    // Match signals to result by taskId
    const enriched = results.map((result) => {
      const signal = signals.find((s) => s._id.toString() === result.taskId.toString());
      return { ...result, signal };
    });

    // Optional chain filtering
    const filtered = chain
      ? enriched.filter((r) => r.signal?.pair?.toLowerCase().includes(chain.toLowerCase()))
      : enriched;

    const totalTrades = filtered.length;

    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const trades24h = filtered.filter((r) => new Date(r.createdAt) >= last24Hours);
    const volume24h = trades24h.reduce((sum, r) => sum + (r.amount || 0), 0);

    const openInterest = filtered.filter((r) => r.roiPercentage === 0).length;

    return {
      totalTrades,
      volume24h,
      openInterest,
      trades: filtered, // optionally return trades
    };
  }

  static async getAllResults() {
    return ResultModel.find().populate("userId taskId").sort({ date: -1 });
  }

  static async getResultsByUser(userId: string) {
    return ResultModel.find({ userId }).populate("taskId").sort({ date: -1 });
  }
}
