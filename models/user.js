import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  portfolio: { type: String, ref: "Token", required: true },
});

module.exports = mongoose.model("User", userSchema);
