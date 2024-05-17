import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    amountSaved: {
      type: Number,
      required: false,
    },
    rate: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Kids",
    },
  },
  { timestamps: true }
);

const Goal = models.Goal || model("Goal", GoalSchema);

export default Goal;
