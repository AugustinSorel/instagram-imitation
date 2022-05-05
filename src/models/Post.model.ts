import { Schema, model } from "mongoose";

export interface IPost {
  url: string;
  likes: number;
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
});

export default model<IPost>("Post", postSchema);
