import mongoose, { ObjectId, Schema, model } from "mongoose";
import User from "../../user/user.model";

export enum mineT {
  normalMine = "NORMAL_MINE", // $5 in 4m
  addFriend = "ADD_FRIENND", // $500
  commission = "COMMISSION", // $100
}

interface I {
  user: ObjectId;
  amount: Number;
  leftOver: Number;
  type: mineT;
}

const resourceSchema = new Schema<I>(
  {
    user: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    amount: { type: Number, required: true },
    leftOver: { type: Number, required: true },
    type: {
      type: String,
      enum: ["NORMAL_MINE", "ADD_FRIENND", "COMMISSION"],
      required: true,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model<I>("Resource", resourceSchema);

export default Resource;
