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

  async singin(createUser) {
    const user = new User(createUser);

    const error = await user.validateSync();
    if (error) throw new PreconditionFailedError(error);


    const usertest = await this.getAllAsync({username: user.username})

    if (usertest.length != 0) {
      throw new Error("Nome de usuário existente");
    }
    await user.save();

    return {
      id: user.id,
      createdAt: user.createdAt,
      username: user.username,
      password: user.password,
      nome: user.nome/*,
      foto: user.foto*/
    };
  }
  async login(query) {
    const user = await User.findOne(
      {
        username: query.username,
        password: query.password
      }
    );
    return {
      id: user.id,
      createdAt: user.createdAt,
      username: user.username,
      password: user.password,
      nome: user.nome/*,
      foto: user.foto*/
    };
  }
  async senhaPORA(username, password) {
    const user = await User.findOne(
      {
        username: username
      }
    );
    if (user == null) throw new NotFoundError("O usuário não foi encontrado.");
    const updateUser = {
      id: user.id,
      createdAt: user.createdAt,
      username: user.username,
      password: password,
      nome: user.nome/*,
      foto: user.foto*/
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, updateUser, { new: true });
    if (updatedUser == null) throw new NotFoundError("O usuário não foi encontrado.");//deixei so por medida de segurança
    return {
      id: updatedUser.id,
      createdAt: updatedUser.createdAt,
      username: updatedUser.username,
      password: updatedUser.password,
      nome: updatedUser.nome/*,
      foto: updatedUser.foto*/
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
      username: user.username
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
}

module.exports = UserService;
