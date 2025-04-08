
import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IWithdrawal extends Document {
  userId: Types.ObjectId;
  amount: number;
  date: Date;
  chain: 'Ethereum'| 'Bitcoin'| 'Binance'| 'Polygon'| 'Solana';
  status: 'Confirmed' | 'Declined';
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
   userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0.000001,  // Prevent zero/negative values
  },
  date: { 
    type: Date, 
    default: Date.now,  
    index: true  
  },
  chain: { 
    type: String, 
    required: true,
    enum: ['Ethereum', 'Bitcoin', 'Binance', 'Polygon', 'Solana'],  
    trim: true
  },
  status: { 
    type: String, 
    required: true,
    enum: ['Confirmed', 'Declined',],  
    default: 'Confirmed'  
  }
}, 
{ timestamps: true }  
);

export default mongoose.model<IWithdrawal>("Withdrawal", WithdrawalSchema);

