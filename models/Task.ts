import { Schema, models, model } from "mongoose";

const taskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  taskDesc: {
    type: String,
    required: true,
  },
  taskDdl: {
    type: Date,
    required: true,
  },
  taskPnt: {
    type: Number,
    required: true,
  },
  pickedBy: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
});
//if no task, create a new one
const Task = models.Task || model("Task", taskSchema);

export default Task;
