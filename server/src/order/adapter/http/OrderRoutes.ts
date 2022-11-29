import { Router } from "express"

import { OrderService } from "../../core/service/OrderService"
import { OrderInMemoryRepo } from "../../repo/OrderInMemoryRepo"

import { tableService } from "../../../table/router/TableRoutes"
import { userService } from "../../../user/adapter/UserRoutes"
import { OrderController } from "./OrderController"

const orderRepo = new OrderInMemoryRepo()
const orderService = new OrderService(orderRepo, tableService, userService)
const orderController = new OrderController(orderService)

const orderRouter = Router()

orderRouter.post("/", orderController.createOrder)
orderRouter.get("/waiting", orderController.getWaitingOrders)
orderRouter.get("/:id", orderController.getOrder)
orderRouter.get("/table/:tableId", orderController.getTablesOrders)
orderRouter.get("/:id/add/:itemId", orderController.addItemToOrder)

export default orderRouter
