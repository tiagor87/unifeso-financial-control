const express = require("express");
const { UserService } = require("../services");

const userService = new UserService();
const userRouter = express.Router();

userRouter.get("/", async (_, response) => {
  const users = await userService.getAllAsync();
  response.status(200).send(users);
});

userRouter.post("/", async (request, response) => {
  const createUser = request.body;
  const user = await userService.createAsync(createUser);
  response.status(201).send(user);
});

// READ
userRouter.get("/:id", async (request, response) => {
  const user = await userService.getByIdAsync(request.params.id);
  if (user == null) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  response.status(200).send(user);
});

// UPDATE
userRouter.put("/:id", async (request, response) => {
  try {
    const user = await userService.updateAsync(request.params.id, request.body);
    if (user == null) {
      return response.status(404).send({
        message: "Usuário não encontrado."
      });
    }
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({
      message: error.toString()
    });
  }
});

// DELETE
userRouter.delete("/:id", async (request, response) => {
  const user = await userService.removeByIdAsync(request.params.id);
  if (user == null) {
    return response.status(404).send({
      message: "Usuário não encontrado."
    });
  }
  response.status(204).end();
});

module.exports = userRouter;
