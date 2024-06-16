import mongoose, { ObjectId, Schema } from "mongoose";

interface IUser {
  name: string;
  username: string;
  password: string;
  friends: ObjectId[];
  currentCredit: Number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    currentCredit: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
