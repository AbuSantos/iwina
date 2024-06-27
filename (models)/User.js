import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

// // const UserSchema = new Schema({
// //   email: {
// //     type: String,
// //     unique: [true, "Email already exists!"],
// //     // required: [true, "Email is required!"],
// //   },
// //   username: {
// //     type: String,
// //     match: [
// //       /^[a-zA-Z0-9\s]{8,20}$/,
// //       "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
// //     ],
// //   },
// //   image: { type: String },
// //   password: { type: String },
// //   points: {
// //     type: Number,
// //   },
// //   ongoingTasks: [
// //     {
// //       type: Schema.Types.ObjectId,
// //       ref: "Task",
// //     },
// //   ],
// //   completedTasks: [
// //     {
// //       type: Schema.Types.ObjectId,
// //       ref: "Task",
// //     },
// //   ],
// //   kids: [
// //     {
// //       type: Schema.Types.ObjectId,
// //       ref: "Kids",
// //     },
// //   ],
// // });

// // const User = models.User || model("User", UserSchema);

// // export default User;

// // User Schema
// const userSchema = new Schema({
//   name: { type: String, default: null },
//   email: { type: String, unique: true, default: null },
//   emailVerified: { type: Date, default: null },
//   image: { type: String, default: null },
//   accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
//   sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
//   Authenticators: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Authenticator" },
//   ],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// Account Schema
const accountSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String, default: null },
  access_token: { type: String, default: null },
  expires_at: { type: Number, default: null },
  token_type: { type: String, default: null },
  scope: { type: String, default: null },
  id_token: { type: String, default: null },
  session_state: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Session Schema
const sessionSchema = new Schema({
  sessionToken: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expires: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// VerificationToken Schema
const verificationTokenSchema = new Schema({
  identifier: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});
verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

// Authenticator Schema
const authenticatorSchema = new Schema({
  credentialID: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerAccountId: { type: String, required: true },
  credentialPublicKey: { type: String, required: true },
  counter: { type: Number, required: true },
  credentialDeviceType: { type: String, required: true },
  credentialBackedUp: { type: Boolean, required: true },
  transports: { type: String, default: null },
});
authenticatorSchema.index({ userId: 1, credentialID: 1 }, { unique: true });

const User = models.User || model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Session = mongoose.model("Session", sessionSchema);
const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);
const Authenticator = mongoose.model("Authenticator", authenticatorSchema);

export { User, Account, Session, VerificationToken, Authenticator };
