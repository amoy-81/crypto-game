import mongoose, { ObjectId, Schema, model } from "mongoose";
import User from "../../user/models/user.model";

interface IRecord {
  user: ObjectId;
  startAt: Number;
  endAt: Number;
  isMined: Boolean;
  amountMined: Number;
}

const recordSchema = new Schema<IRecord>(
  {
    user: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    startAt: { type: Number, default: Math.floor(new Date().getTime() / 1000) },
    endAt: { type: Number, default: null },
    isMined: { type: Boolean, default: false },
    amountMined: { type: Number, default: null },
  },
  { timestamps: true }
);

const Record = mongoose.model<IRecord>("Record", recordSchema);

export default Record;
