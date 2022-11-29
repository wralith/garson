import { TableDTO } from "../../../table/service/TableDTO"
import { UserDTO } from "../../../user/core/service/UserDTO"
import { MenuItem } from "../../menu/MenuItem"
import { FoodMenu, BeverageMenu } from "../../menu/Menu"
import { Order } from "../domain/Order"

export interface OrderDTO {
  id: string
  items: MenuItem[]
  isWaiting: boolean
  isCanceled: boolean
  user: UserDTO
  table: TableDTO
}

export class OrderMap {
  public static toDomain(dto: OrderDTO) {
    let itemIds: string[] = []
    dto.items.forEach((item) => {
      itemIds = [...itemIds, item.id]
    })

    return new Order({
      items: itemIds,
      userId: dto.user.id,
      tableId: dto.table.id,
      isWaiting: dto.isWaiting,
      isCanceled: dto.isCanceled,
    })
  }

  public static toDTO(order: Order, user: UserDTO, table: TableDTO): OrderDTO {
    let items: MenuItem[] = []
    order.items.forEach((item) => {
      const v = FoodMenu.getOne(item) ?? BeverageMenu.getOne(item)
      if (v) {
        items = [...items, v]
      }
    }) // Throws if invalid item

    console.log(items)

    return {
      id: order.id,
      items: items,
      isWaiting: order.isWaiting,
      isCanceled: order.isCanceled,
      user: user,
      table: table,
    }
  }
}
