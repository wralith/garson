import express from "express"

import { TableInMemoryRepo } from "../repo/TableInMemoryRepo"
import { TableService } from "../service/TableService"
import { TableController } from "./TableController"

const tableRepo = new TableInMemoryRepo()
export const tableService = new TableService(tableRepo)
const tableController = new TableController(tableService)

const tableRouter = express.Router()

tableRouter.post("/", tableController.createTable)
tableRouter.get("/", tableController.getAllTables)
tableRouter.patch("/:id", tableController.toggleIsTaken)

export default tableRouter
