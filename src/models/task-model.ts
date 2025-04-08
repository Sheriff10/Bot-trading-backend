
import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  pointReward: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    pointReward: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", TaskSchema);

