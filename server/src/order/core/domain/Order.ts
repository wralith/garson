import { Entity } from "../../../common/domain/Entity"

interface OrderProps {
  items: string[]
  userId: string
  tableId: string
  isWaiting?: boolean
  isCanceled?: boolean
}

export class Order extends Entity<OrderProps> {
  items: string[]
  userId: string
  tableId: string
  isWaiting = true
  isCanceled = false
  constructor(props: OrderProps, id?: string) {
    super(id)
    this.items = props.items
    this.userId = props.userId
    this.tableId = props.tableId
  }
}
