import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const BankSchema = new Schema({
  bank_name: {
    type: String,
    required: [true],
  },
  account_number: {
    type: Number,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
  },
});

//check if we've a BankDetails model, if not create one
const BankDetails = models.BankDetails || model("BankDetails", BankSchema);

export default BankDetails;
