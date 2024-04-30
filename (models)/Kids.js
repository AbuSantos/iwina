import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const KidsSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true],
  },
  password: { type: String, required: [true] },
  points: { type: Number },
  ongoingTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  image: { type: String },
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

const Kids = models.KidsSchema || model("KidsSchema", KidsSchema);

export default Kids;
