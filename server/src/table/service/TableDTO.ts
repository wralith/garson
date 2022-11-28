import { Table } from "../domain/Table"

export interface TableDTO {
  id: string
  name: string
  seats: number
  isTaken: boolean
}

export class TableMap {
  public static toDto(table: Table): TableDTO {
    return {
      id: table.id,
      name: table.name,
      seats: table.seats,
      isTaken: table.isTaken,
    }
  }

  public static toDomain(dto: TableDTO): Table {
    return Table.create(
      {
        name: dto.name,
        seats: dto.seats,
        isTaken: dto.isTaken,
      },
      dto.id
    )
  }
}
