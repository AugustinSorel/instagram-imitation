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

export default mongoose.model("User", userSchema);
