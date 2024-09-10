import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 16,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 16,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "developer", "admin"],
    default: "user",
  },
});

UserSchema.methods.authenticate = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export const UserModel = model("User", UserSchema);
