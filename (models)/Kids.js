import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const kidsSchema = new Schema({
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
  favTeachersName: {
    type: String,
    required: false,
  },
  favFood: {
    type: String,
    required: false,
  },
  allergies: {
    type: String,
    required: false,
  },
  doctorsName: {
    type: String,
    required: false,
  },
  birthday: {
    type: String,
    required: false,
  },

  favColor: {
    type: String,
    required: false,
  },
  bestFriendsName: {
    type: String,
    required: false,
  },
  favArtiste: {
    type: String,
    required: false,
  },
  favSong: {
    type: String,
    required: false,
  },
  favSubject: {
    type: String,
    required: false,
  },
  completedTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  BankDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "BankDetails",
    },
  ],
  goal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goals",
    },
  ],
});

const Kids = models?.Kids || model("Kids", kidsSchema);

export default Kids;
