const { Schema, model, models } = require("mongoose");

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
MessageSchema.index({ creator: 1, message: 1, roomId: 1 }, { unique: true });

const Message = models.Messages || model("Messages", MessageSchema);
module.exports = Message;
