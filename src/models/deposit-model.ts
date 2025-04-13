import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IDeposit extends Document {
  userId: Types.ObjectId;
  hash: string;
  amount: number;
  date: Date;
  chain: "ETH" | "BTC" | "BSC" | "TON" | "SOL";
  status: "Confirmed" | "Declined" | "Pending";
  createdAt: Date;
  updatedAt: Date;
}

const DepositSchema = new Schema<IDeposit>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
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
      default: "Confirmed",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDeposit>("Deposit", DepositSchema);
