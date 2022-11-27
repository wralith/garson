import { Entity } from "../../common/domain/Entity"

interface TableProps {
  name: string
  seats: number
  isTaken?: boolean
}

export class Table extends Entity<TableProps> {
  name: string
  seats: number
  isTaken: boolean

  private constructor(props: TableProps, id?: string) {
    super(id)
    this.name = props.name
    this.seats = props.seats
    this.isTaken = props.isTaken ?? false
  }

  public static create(props: TableProps, id?: string) {
    return new Table(props, id)
  }
}
