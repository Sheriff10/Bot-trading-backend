
import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface ISignal extends Document {
  pair: "USDT/NGN"| "BTC/NGN" | "USD/BTC" ;
  pnl: 'Profit' | 'Loss' ;
  amount: number;
  percentage: number;
  target: '1' | '2';
  stopLoss: number;
  entry: number;
  position: 'Long' | 'Short' ;
  createdAt: Date;
  updatedAt: Date;
}

const SignalSchema = new Schema<ISignal>(
  {
    pair: {
      type: String,
      required: true,
    },
    pnl: {
      type: String,
      enum: ['profit', 'loss']
    },
    amount: {
      type: Number,
      required: true,
    },
    percentage: {
        type: Number,
    },
    target: {
        type: String,
        enum: ['1', '2']
    },
    stopLoss: {
        type: Number,
    },
    entry: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        enum: ['Long', 'Short']
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISignal>("Signal", SignalSchema);

