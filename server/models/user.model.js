import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String, require: true },
  userEmail: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, default: "user" },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
