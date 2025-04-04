import { Request, Response} from 'express';
import SignalModel from "../../models/signal-model"
import { devResponse, errorResponse } from '../../utils/response-util';

export class SignalController{
static async getAllSignals(req: Request, res: Response) {
  try {
    const { pnl, pair, position } = req.query;

    const query: any = {};
    if (pnl) query.pnl = pnl;
    if (pair) query.pair = pair;
    if (position) query.position = position;
    const signals = await SignalModel.find().sort({ createdAt: -1 }); // latest first

    return devResponse(res, signals);
  } catch (error) {
    console.error('Error fetching signals:', error);
      return errorResponse(res);
  }
}
}