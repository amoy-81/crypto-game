import mongoose, { ObjectId, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IUser {
  name: string;
  username: string;
  t_id: number;
  friends: string[];
  currentCredit: Number;
  il: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    t_id: { type: Number, unique: true, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    currentCredit: { type: Number, default: 10 },
    il: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
