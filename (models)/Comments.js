import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const CommentSchema = new Schema(
  {
    creator: {
      type: String,
      required: true, // Reference path based on the value of creatorType
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

//if no task, create a new one
export const Comments = models.Comments || model("Comments", CommentSchema);
