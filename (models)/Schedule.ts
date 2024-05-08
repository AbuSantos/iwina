import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const ScheduleSchema = new Schema(
  {
    user: {
      type: String,
      required: true, // Reference path based on the value of creatorType
    },
    schedule: {
      type: String,
      required: true,
    },
    familyId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Schedule = models.Schedule || model("Schedule", ScheduleSchema);
