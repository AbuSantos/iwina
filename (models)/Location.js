import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const LocationSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  accuracy: {
    type: String,
    required: true,
  },
  familyLocationId: {
    type: String,
    required: true,
  },
});

export const Location = models.Location || model("Location", LocationSchema);
