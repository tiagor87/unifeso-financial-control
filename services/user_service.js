const { isValidObjectId } = require("mongoose");
const { User } = require("../models");

class UserService {
  async createAsync(createUser) {
    const user = await User.create(createUser);
    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    };
  }

  async updateAsync(id, updateUser) {
    const user = await User.findByIdAndUpdate(id, updateUser, { new: true });
    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    };
  }

  async removeByIdAsync(id) {
    return await User.findByIdAndDelete(id);
  }

  async getByIdAsync(id) {
    if (!isValidObjectId(id)) {
      throw new Error("Id is invalid.");
    }

    const user = await User.findById(id);

    if (user == null) return null;

    return {
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    };
  }

  async getAllAsync() {
    const users = await User.find();
    return users.map((user) => ({
      id: user._id,
      createdAt: user.createdAt,
      username: user.username
    }));
  }
}

module.exports = UserService;
