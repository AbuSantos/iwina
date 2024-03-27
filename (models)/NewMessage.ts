import { Schema, model, models } from "mongoose";

const NewMessageSchema = new Schema(
  {
    message: { type: String, required: true },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    child: {
      type: Schema.Types.ObjectId,
      ref: "Kids",
    },
  },
  { timestamps: true }
);

const NewMessage = models.Messages || model("Messages", NewMessageSchema);
export default NewMessage;
