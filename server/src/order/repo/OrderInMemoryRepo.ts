import { Order } from "../core/domain/Order"
import { IOrderRepo } from "../core/port/IOrderRepo"

const orderMap: Map<string, Order> = new Map()

export class OrderInMemoryRepo implements IOrderRepo {
  async get(id: string): Promise<Order> {
    const order = orderMap.get(id)
    if (!order) {
      throw new Error(`Order with id ${id} not found`)
    }
    return order
  }

  async getAll(): Promise<Order[]> {
    return Array.from(orderMap.values())
  }

  async getAllWaiting(): Promise<Order[]> {
    return Array.from(orderMap.values()).filter((v) => v.isWaiting === true)
  }

  async save(order: Order): Promise<string> {
    orderMap.set(order.id, order)
    return order.id
  }

  async completeOrder(id: string) {
    const order = await this.get(id)
    order.isWaiting = false
    orderMap.set(id, order)
    return id
  }

  async cancelOrder(id: string) {
    const order = await this.get(id)
    order.isCanceled = true
    order.isWaiting = false
    orderMap.set(id, order)
    return id
  }
}
