import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const MessageSchema = new Schema(
  {
    creator: {
      type: String,
      required: true, // Reference path based on the value of creatorType
    },
    message: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// MessageSchema.index({ creator: 1, message: 1, roomId: 1 }, { unique: true });

export const Messages = models.Messages || model("Messages", MessageSchema);
