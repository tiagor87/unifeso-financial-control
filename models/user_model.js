const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "O nome do usuário é obrigatório"]
  },
  password: {
    type: String,
    required: [true, "A senha é obrigatória"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const User = model("User", UserSchema);

module.exports = User;
