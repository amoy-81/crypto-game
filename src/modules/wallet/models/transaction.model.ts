import mongoose, { ObjectId, Schema, model } from "mongoose";
import User from "../../user/models/user.model";

interface I {
  payer: ObjectId;
  receiver: ObjectId;
  amount: Number;
}

const transactionSchema = new Schema<I>(
  {
    payer: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<I>("Transaction", transactionSchema);

export default Transaction;
