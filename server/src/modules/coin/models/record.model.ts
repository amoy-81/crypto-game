import mongoose, { ObjectId, Schema, model } from "mongoose";
import User from "../../user/user.model";

interface IRecord {
  user: ObjectId;
  startAt: Number;
  endAt: Number;
  isRecord: Boolean;
}

const recordSchema = new Schema<IRecord>(
  {
    user: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    startAt: { type: Number, default: new Date().getTime() },
    endAt: { type: Number, default: null },
    isRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Record = mongoose.model<IRecord>("Record", recordSchema);

export default Record;
