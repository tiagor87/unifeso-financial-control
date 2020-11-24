const { isValidObjectId } = require("mongoose");
const { User } = require("../models");
const { PreconditionFailedError, NotFoundError } = require("../errors");

class UserService {
  async createAsync(createUser) {
    const user = new User(createUser);

    const error = await user.validateSync();
    if (error) throw new PreconditionFailedError(error);

    await user.save();

    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    };
  }

  async updateAsync(id, updateUser) {
    if (!isValidObjectId(id) || updateUser == null) {
      throw new PreconditionFailedError(
        "O identificador e os campos para atualização são obrigatórios."
      );
    }
    const user = await User.findByIdAndUpdate(id, updateUser, { new: true });
    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");
    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    };
  }

  async removeByIdAsync(id) {
    const user = await User.findByIdAndDelete(id);
    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");
  }

  async getByIdAsync(id) {
    if (!isValidObjectId(id)) {
      throw new Error("Id is invalid.");
    }

    const user = await User.findById(id);

    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");

    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username,
      email: user.email
    };
  }

  async getAllAsync(query) {
    const users = await User.find(query);
    return users.map((user) => ({
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    }));
  }

  async validateAsync(query) {
    const {username, password} = query

    if ( username == null ) throw new NotFoundError("Sem usuário informado");
    if ( password == null ) throw new NotFoundError("Sem senha informada");
    
    const user = await User.findOne({username, password})

    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");

    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username,
      email: user.email
    };
  }

  async getRecoverAsync(query){
    const {username, email} = query

    if ((username == null) || (email == null))
      throw new PreconditionFailedError("Valores de requisição incompletos.")

    const user = await User.findOne({username, email})
    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");

    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username,
      rps_pergunta: user.rps_pergunta,
      email: user.email
    };

  }

  async recoverAsync(query){
    const {username, email, password, rps_resposta} = query

    if ((username == null) || (email == null) || (rps_resposta == null))
      throw new PreconditionFailedError("Valores de requisição incompletos.")

    const user = await User.findOne({username, email, rps_resposta})
    if (user == null) throw new NotFoundError("Valores inválidos. Não foi possível realizar a recuperação.");
    return await this.updateAsync(user._id, {password})
  }
}

module.exports = UserService;
