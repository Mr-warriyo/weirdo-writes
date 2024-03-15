const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    name: String,
    email: String,
    password: String,
    verified: Boolean,
    _id: Number,
    canRead: [{ type: ObjectId, ref: 'Note' }],
    canEdit: [{ type: ObjectId, ref: 'Note '}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", user);

module.exports = User;