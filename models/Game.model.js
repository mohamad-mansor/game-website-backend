import { Schema, model } from "mongoose";

const GameSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  developer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  releaseDate: Date,
  createdAt: { type: Date, default: Date.now },
});

export const GameModel = model("Game", GameSchema);
