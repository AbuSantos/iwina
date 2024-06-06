import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const CommentSchema = new Schema(
  {
    creator: {
      type: String,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    childId: {
      type: Schema.Types.ObjectId,
      ref: "Kids",
    },
    message: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

//if no comment, create a new one
export const Comments = models.Comments || model("Comments", CommentSchema);
