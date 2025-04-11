import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IResult extends Document {
  userId: Types.ObjectId;
  taskId: Types.ObjectId;
  date: Date;
  amount: number;
  roiPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResult>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    roiPercentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResult>("Result", ResultSchema);
