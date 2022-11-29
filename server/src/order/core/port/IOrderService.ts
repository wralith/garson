import { OrderDTO } from "../service/OrderDTO"

export interface IOrderService {
  get(id: string): Promise<OrderDTO>
  getAll(): Promise<OrderDTO[]>
  getByTableId(tableId: string): Promise<OrderDTO[]>
  getAllWaiting(): Promise<OrderDTO[]>
  create(items: string[], userId: string, tableId: string): Promise<string>
  addItem(id: string, itemId: string): Promise<string>
  cancel(id: string): Promise<string>
  complete(id: string): Promise<string>
}
