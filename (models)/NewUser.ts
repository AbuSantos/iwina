import { Schema, model, models } from "mongoose";
const NewUserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  username: { type: String },
  points: { type: Number },
});

const NewUser = models.User || model("User", NewUserSchema);

export default NewUser;
