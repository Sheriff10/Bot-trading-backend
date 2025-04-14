// Address.model.ts
import mongoose, { Document, Schema, model } from "mongoose";

export interface IAddress extends Document {
  addressConfig: {
    chain: "ton" | "eth" | "bsc";
    address: string;
  }[];
}

const AddressConfigSchema = new Schema(
  {
    chain: { type: String, enum: ["ton", "eth", "bsc"], required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const AddressSchema = new Schema<IAddress>(
  {
    addressConfig: { type: [AddressConfigSchema], default: [] },
  },
  { timestamps: true }
);

export default model<IAddress>("Address", AddressSchema);
