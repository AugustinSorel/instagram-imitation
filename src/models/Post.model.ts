import { Schema, model, PopulatedDoc } from "mongoose";
import { IUser } from "./User.model";

export interface IPost {
  createdBy: PopulatedDoc<IUser>;
  url: string;
  likes: number;
  likedBy: [PopulatedDoc<IUser>];
}

const postSchema = new Schema<IPost>({
  url: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    required: true,
    default: 0,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default model<IPost>("Post", postSchema);
