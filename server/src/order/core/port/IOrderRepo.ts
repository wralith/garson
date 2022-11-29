import { Order } from "../domain/Order"

export interface IOrderRepo {
  get(id: string): Promise<Order>
  getAll(): Promise<Order[]>
  getAllWaiting(): Promise<Order[]>
  save(order: Order): Promise<string>
  completeOrder(id: string): Promise<string>
  cancelOrder(id: string): Promise<string>
}
