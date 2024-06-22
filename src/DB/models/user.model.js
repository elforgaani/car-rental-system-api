import mongoose from "mongoose";

const { Schema, model } = mongoose;

const shcema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
    },
    phone_number: {
      type: String,
      required: true,
      uniqe: true,
      minLength: 10,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || model("User", shcema);
