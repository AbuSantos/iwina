import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const ScheduleSchema = new Schema(
  {
    user: {
      type: String,
      required: true, // Reference path based on the value of creatorType
    },
    // user: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Task",
    //   },
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Kids",
    //   },
    // ],

    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: false,
    },
    familyId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    image: { type: String, required: false },
  },
  { timestamps: true }
);
export const Schedule = models.Schedule || model("Schedule", ScheduleSchema);
