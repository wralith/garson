import { Request, Response } from "express"
import { IOrderService } from "../../core/port/IOrderService"
import { CreateOrderRequest, validateCreateOrderRequest } from "./Requests"

export class OrderController {
  service: IOrderService

  constructor(service: IOrderService) {
    this.service = service
  }

  createOrder = async (req: Request, res: Response) => {
    try {
      const input: CreateOrderRequest = req.body
      validateCreateOrderRequest(input)

      const id = await this.service.create(input.items, input.userId, input.tableId)
      return res.status(201).send({ id: id })
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getOrder = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const order = await this.service.get(id)

      return res.status(201).send(order)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  addItemToOrder = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const itemId = req.params.itemId
      const order = await this.service.addItem(id, itemId)

      return res.status(201).send({ id: order })
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getWaitingOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.service.getAllWaiting()

      return res.status(201).send(orders)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getTablesOrders = async (req: Request, res: Response) => {
    try {
      const tableId = req.params.tableId
      const orders = await this.service.getByTableId(tableId)

      return res.status(201).send(orders)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  setCompleted = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      await this.service.complete(id)

      return res.status(201).send(id)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  setCanceled = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      await this.service.cancel(id)

      return res.status(201).send(id)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }
}
