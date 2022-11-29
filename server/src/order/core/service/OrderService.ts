import { ITableService } from "../../../table/service/TableService"
import { IUserService } from "../../../user/core/port/IUserService"
import { OrderInMemoryRepo } from "../../repo/OrderInMemoryRepo"
import { Order } from "../domain/Order"
import { IOrderRepo } from "../port/IOrderRepo"
import { IOrderService } from "../port/IOrderService"
import { OrderMap, OrderDTO } from "./OrderDTO"

export class OrderService implements IOrderService {
  repo: IOrderRepo
  tableService: ITableService
  userService: IUserService

  constructor(repo: OrderInMemoryRepo, tableService: ITableService, userService: IUserService) {
    ;(this.repo = repo), (this.tableService = tableService), (this.userService = userService)
  }

  async get(id: string): Promise<OrderDTO> {
    const order = await this.repo.get(id)
    const dto = await this.composeOrder(order)

    return dto
  }

  async getAll(): Promise<OrderDTO[]> {
    const orders = await this.repo.getAll()
    const dtos = await this.composeOrders(orders)

    return dtos
  }

  async getByTableId(tableId: string): Promise<OrderDTO[]> {
    const all = await this.getAll()
    const dtos = all.filter((v) => v.table.id === tableId)

    return dtos
  }

  async getAllWaiting(): Promise<OrderDTO[]> {
    const orders = await this.repo.getAllWaiting()
    const dtos = await this.composeOrders(orders)

    return dtos
  }

  async create(items: string[], userId: string, tableId: string): Promise<string> {
    await this.userService.getUser(userId).catch(() => {
      throw new Error("invalid user id")
    })
    await this.tableService.getById(tableId).catch(() => {
      throw new Error("invalid table id")
    })

    const order = new Order({ items, userId, tableId })
    await this.repo.save(order)

    return order.id
  }

  async addItem(id: string, itemId: string): Promise<string> {
    const order = await this.repo.get(id)
    order.items.push(itemId)
    await this.repo.save(order)

    return order.id
  }

  async cancel(id: string): Promise<string> {
    await this.repo.cancelOrder(id)
    return id
  }

  async complete(id: string): Promise<string> {
    await this.repo.completeOrder(id)
    return id
  }

  private async composeOrder(order: Order): Promise<OrderDTO> {
    const user = await this.userService.getUser(order.userId)
    const table = await this.tableService.getById(order.tableId)
    const dto = OrderMap.toDTO(order, user, table)

    return dto
  }

  private async composeOrders(orders: Order[]): Promise<OrderDTO[]> {
    let dtos: OrderDTO[] = []
    await Promise.all(
      orders.map(async (order) => {
        const v = await this.composeOrder(order)
        dtos = [...dtos, v]
      })
    )

    return dtos
  }
}
