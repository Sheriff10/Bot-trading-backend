
import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IUser extends Document {
  userName: string;
  telegramId: number;
  coinBalance: number;
  completedTask: string[];
  availableBalance: number;
  operatingBalance: number;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);

