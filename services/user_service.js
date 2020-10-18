const { User } = require("../models");

class UserService {
  async createAsync(createUser) {
    return await User.create(createUser);
  }

  async updateAsync(id, updateUser) {
    return await User.findByIdAndUpdate(id, updateUser, { new: true });
  }

  async removeByIdAsync(id) {
    return await User.findByIdAndDelete(id);
  }

  async getByIdAsync(id) {
    return await User.findById(id);
  }

  async getAllAsync() {
    return await User.find();
  }
}

module.exports = UserService;
