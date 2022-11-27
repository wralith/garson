import { Table } from "../domain/Table"

export interface ITableRepo {
  get(id: string): Promise<Table>
  getAll(): Promise<Table[]>
  save(table: Table): Promise<string>
  delete(id: string): Promise<string>
}
