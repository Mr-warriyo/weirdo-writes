const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    name: String,
    email: String,
    password: String,
    verified: Boolean,
    _id: Number,
    canRead: [{ type: Object, ref: 'Note' }],
    canEdit: [{ type: Object, ref: 'Note '}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", user);

module.exports = User;