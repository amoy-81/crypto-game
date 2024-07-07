import mongoose, { Schema } from "mongoose";

interface I {
  price: Number;
}

const goldSchema = new Schema<I>(
  {
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Gold = mongoose.model<I>("Gold", goldSchema);

export default Gold;
