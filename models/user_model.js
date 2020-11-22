const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fotoPerfil: {
    type: String,
    required: false
  },
  nome: {
      type: String,
      required: [true, "O nome do usuário é obrigatório"]
  },
  sobrenome: {
      type: String,
      required: [true, "O campo 'Sobrenome' é obrigatório"]
  },
  genero: {
      type: String,
      required: false
  },
  dataNascimento: {
      type: Date,
      required: false
  },
  telefone: {
      type: String,
      required: false
  },
  endereco: {
      type: String,
      required: false
  },
  email: {
      type: String,
      required: [true, "O e-mail é obrigatório"],
      lowercase: true
  },
  password: {
      type: String,
      required: [true, "A senha é obrigatória"],
      select: false
  },
  createdAt: {
      type: Date,
      default: Date.now()
  }
});

const User = model("User", UserSchema);

module.exports = User;
