
import mongoose, { Document, Schema, model, Types } from "mongoose";
import { IDeposit } from "./deposit-model";
import { IWithdrawal } from "./withdrawal-model";

export interface IUser extends Document {
  userName: string;
  telegramId: number;
  coinBalance: number;
  availableBalance: number;
  operatingBalance: number;
  deposits: Types.ObjectId[];  
  withdrawals: Types.ObjectId[];
  completedTask: Types.ObjectId[];
  lastMiningClaim?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    telegramId: {
      type: Number,
      required: true,
      unique: true,
    },
    coinBalance: {
      type: Number,
      default: 0,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },
    operatingBalance: {
      type: Number,
      default: 0,
    },
    completedTask: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deposit" }],
    withdrawals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Withdrawal" }],
    lastMiningClaim: {
        type: Date,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);

