import { NextFunction } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },

  age: {
    type: Number,
    required: true,
    min: 0,
    max: 150,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("password not been modified");
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  next();
});

export default mongoose.model("User", userSchema);
