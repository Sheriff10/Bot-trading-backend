import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IWithdrawal extends Document {
  userId: Types.ObjectId;
  amount: number;
  address: string;
  date: Date;
  chain: "ETH" | "BTC" | "BSC" | "TON" | "SOL";
  status: "Confirmed" | "Declined" | "Pending";
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.000001, // Prevent zero/negative values
    },

    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    chain: {
      type: String,
      required: true,
      enum: ["ETH", "BTC", "BSC", "TON", "SOL"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Confirmed", "Declined", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IWithdrawal>("Withdrawal", WithdrawalSchema);
