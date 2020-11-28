const express = require("express");
const { UserService } = require("../services");
const asyncHandler = require("express-async-handler");
const { request, response } = require("express");
const { PreconditionFailedError } = require("../errors");

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
/*
userRouter.put(
  "/:id",
  asyncHandler(async (request, response) => {
    
    console.log("passou aqui sim!");
    const user = await userService.updateAsync(request.params.id, request.body);
    response.status(200).send(user);
  })
);*/

// DELETE
// /users/<id>
userRouter.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    await userService.removeByIdAsync(request.params.id);
    response.status(204).end();
  })
);

//users/login
userRouter.post(//login teve q ser post pq só assim consigo passar um json no body com o username e a senha
  "/login",
    asyncHandler(async (request, response) => {
    const user = await userService.login(request.body);
    response.status(200).send(user);
  })
);

//users/singin
userRouter.post(
  "/singin",
  asyncHandler(async (request, response) => {
    const createUser = request.body;
    try {
      const user = await userService.singin(createUser);
      response.status(201).send(user);
    } catch (error) {
      if(error instanceof PreconditionFailedError) {
        response.status(400).send({});
      }
      else {
        response.status(406).send(error);
      }
    }
  })
);
//users/update_password
userRouter.put(
  "/update_password",
  asyncHandler(async (request, response) => {
    const createUser = request.body;
    try {
      const user = await userService.senhaPORA(createUser.username, createUser.password);
      response.status(201).send(user);
    } catch (error) {
      //TODO: tratar os erros que podem retornar
      response.status(406).send(error);//sem tempo pra tratar esse aqui antes da entrega
    }
  })
);
module.exports = userRouter;
