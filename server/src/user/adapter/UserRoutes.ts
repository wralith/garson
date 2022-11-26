import express from "express"

import { UserInMemoryRepo } from "../repo/UserInMemoryRepo"
import { UserService } from "../core/service/UserService"
import { UserController } from "./UserController"

const userRepo = new UserInMemoryRepo()
const userService = new UserService(userRepo)
const userController = new UserController(userService)

const userRouter = express.Router()

userRouter.post("", userController.register)

export default userRouter
