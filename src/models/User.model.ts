import bcrypt from "bcrypt";
import { Schema, model, PopulatedDoc } from "mongoose";
import { IPost } from "./Post.model";

export interface IUser {
  username: string;
  email: string;
  age: number;
  password: string;
  refreshTokenCount: number;
  avatar: string;
  posts: [PopulatedDoc<IPost>];
  postsLiked: [PopulatedDoc<IPost>];
  validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
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

  refreshTokenCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dvjmzgrqq/image/upload/v1651599950/instagram-imitation/avatars/default-avatar_xo7ier.png",
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  postsLiked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
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

userSchema.methods.validatePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>("User", userSchema);
