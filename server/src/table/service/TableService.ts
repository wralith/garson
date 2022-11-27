import { Table } from "../domain/Table"
import { ITableRepo } from "../repo/ITableRepo"

export interface ITableService {
  getAll(): Promise<Table[]>
  toggleIsTaken(id: string): Promise<Table>
  create(table: Table): Promise<string>
  update(table: Table): Promise<Table>
  delete(id: string): Promise<string>
}

export class TableService implements ITableService {
  repo: ITableRepo

  constructor(repo: ITableRepo) {
    this.repo = repo
  }

  async getAll(): Promise<Table[]> {
    return this.repo.getAll()
  }

  async toggleIsTaken(id: string): Promise<Table> {
    const table = await this.repo.get(id)
    table.isTaken = !table.isTaken
    await this.repo.save(table)
    return table
  }

  async create(table: Table): Promise<string> {
    const newTable = Table.create({ name: table.name, seats: table.seats })
    const id = await this.repo.save(newTable)
    return id
  }

  async update(table: Table): Promise<Table> {
    const id = await this.repo.save(table)
    return this.repo.get(id)
  }

  async delete(id: string): Promise<string> {
    return await this.repo.delete(id)
  }
}
