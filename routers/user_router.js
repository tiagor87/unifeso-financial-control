const express = require("express");
const { UserService } = require("../services");
const asyncHandler = require("express-async-handler");

const userService = new UserService();
const userRouter = express.Router();

// /users/
userRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    const users = await userService.getAllAsync(request.query);
    response.status(200).send(users);
  })
);

// /users/
userRouter.post(
  "/",
  asyncHandler(async (request, response) => {
    const createUser = request.body;
    const user = await userService.createAsync(createUser);
    response.status(201).send(user);
  })
);

// /users/validate
userRouter.post(
  "/validate",
  asyncHandler(async (request, response) => {
    const user = await userService.validateAsync(request.body);
    response.status(201).send(user);
  })
);

// /users/recover
userRouter.put(
  "/recover",
  asyncHandler(async (request, response) => {
    const user = await userService.recoverAsync(request.body);
    response.status(201).send(user);
  })
);

userRouter.post(
  "/recover",
  asyncHandler(async (request, response) => {
    const user = await userService.getRecoverAsync(request.body);
    response.status(201).send(user);
  })
);

// READ
// /users/<id>
userRouter.get(
  "/:id",
  asyncHandler(async (request, response) => {
    const user = await userService.getByIdAsync(request.params.id);
    response.status(200).send(user);
  })
);

// UPDATE
// /users/<id>
userRouter.put(
  "/:id",
  asyncHandler(async (request, response) => {
    const user = await userService.updateAsync(request.params.id, request.body);
    response.status(200).send(user);
  })
);

// DELETE
// /users/<id>
userRouter.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    await userService.removeByIdAsync(request.params.id);
    response.status(204).end();
  })
);

module.exports = userRouter;
