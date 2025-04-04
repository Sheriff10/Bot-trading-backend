
import mongoose, { Document, Schema, model, Types } from "mongoose";

export interface IDeposit extends Document {
  userId: Types.ObjectId;
  hash: string;
  date: Date;
  chain: 'Ethereum'| 'Bitcoin'| 'Binance'| 'Polygon'| 'Solana';
  status: 'Confirmed' | 'Declined';
  createdAt: Date;
  updatedAt: Date;
}

const DepositSchema = new Schema<IDeposit>(
  {
   userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  hash: { 
    type: String, 
    required: true, 
    unique: true,  
    trim: true 
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
    enum: ['Confirmed', 'Declined'],  
    default: 'Confirmed'  
  }
}, 
{ timestamps: true }  
);

export default mongoose.model<IDeposit>("Deposit", DepositSchema);

