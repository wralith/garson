import { Table } from "../domain/Table"
import { ITableRepo } from "./ITableRepo"

const tableMap: Map<string, Table> = new Map()

export class TableInMemoryRepo implements ITableRepo {
  async get(id: string): Promise<Table> {
    const table = tableMap.get(id)
    if (!table) {
      throw new Error(`table with id: '${id}' not found`)
    }
    return table
  }

  async getAll(): Promise<Table[]> {
    return Array.from(tableMap.values())
  }

  async save(table: Table): Promise<string> {
    tableMap.set(table.id, table)
    return table.id
  }

  async delete(id: string): Promise<string> {
    const isDeleted = tableMap.delete(id)
    if (!isDeleted) {
      throw new Error(`table with id: '${id}' not found`)
    }
    return id
  }
}
