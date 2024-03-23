// goal.js
import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema({
  kids: {
    type: Schema.Types.ObjectId,
    ref: "Kids",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // Other goal-related fields
});

const Goal = models.Goal || model("Goal", GoalSchema);

export default Goal;
