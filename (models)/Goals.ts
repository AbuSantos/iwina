import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    Amount: {
      type: Number,
      required: true,
    },
    Rate: {
      type: String,
      required: true,
    },
    DueDate: {
      type: Date,
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
