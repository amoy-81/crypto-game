import mongoose, { ObjectId, Schema, model } from "mongoose";
import User from "../../user/user.model";

interface I {
  user: ObjectId;
  amount: Number;
  leftOver: Number;
}

const resourceSchema = new Schema<I>(
  {
    user: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    amount: { type: Number, required: true },
    leftOver: { type: Number, required: true },
  },
  { timestamps: true }
);

const Resource = mongoose.model<I>("Resource", resourceSchema);

export default Resource;
