import { Schema, model, models } from "mongoose";

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

const Message = models.Messages || model("Messages", MessageSchema);
export default Message;
