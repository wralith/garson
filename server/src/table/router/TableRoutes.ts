import express from "express"

import { TableInMemoryRepo } from "../repo/TableInMemoryRepo"
import { TableService } from "../service/TableService"
import { TableController } from "./TableController"

const repo = new TableInMemoryRepo()
const service = new TableService(repo)
const controller = new TableController(service)

const tableRouter = express.Router()

tableRouter.post("/", controller.createTable)
tableRouter.get("/", controller.getAllTables)
tableRouter.patch("/:id", controller.toggleIsTaken)

export default tableRouter
