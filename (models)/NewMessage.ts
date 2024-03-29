import { Schema, model, models } from "mongoose";

const NewMessageSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      refPath: "creatorType", // Reference path based on the value of creatorType
    },
    creatorType: {
      type: String,
      enum: ["parent", "child"], // Allowed values for creator type
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    child: [
      {
        type: Schema.Types.ObjectId,
        ref: "Kids",
      },
    ],
  },
  { timestamps: true }
);

const NewMessage = models.Messages || model("Messages", NewMessageSchema);
export default NewMessage;
