import { Schema, model, models } from "mongoose";

const kidsSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
  },
  password: { type: String },
  points: { type: Number },
  ongoingTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  completedTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  goal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
    },
  ],
});

const KidsSchema = models.KidsSchema || model("KidsSchema", kidsSchema);
