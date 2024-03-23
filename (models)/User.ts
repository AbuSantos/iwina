import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    // required: [true, "Email is required!"],
  },
  username: {
    type: String,
    match: [
      /^[a-zA-Z0-9\s]{8,20}$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: { type: String },
  password: { type: String },
  points: {
    type: Number,
  },
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
  ]
});

const User = models.User || model("User", UserSchema);

export default User;
