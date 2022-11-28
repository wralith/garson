import { Table } from "../domain/Table"
import { ITableRepo } from "../repo/ITableRepo"
import { TableDTO } from "./TableDTO"

export interface ITableService {
  getById(id: string): Promise<TableDTO>
  getAll(): Promise<TableDTO[]>
  toggleIsTaken(id: string): Promise<TableDTO>
  create(table: Table): Promise<string>
  update(table: Table): Promise<TableDTO>
  delete(id: string): Promise<string>
}

export class TableService implements ITableService {
  repo: ITableRepo

  constructor(repo: ITableRepo) {
    this.repo = repo
  }

  async getById(id: string): Promise<TableDTO> {
    return this.repo.get(id)
  }

  async getAll(): Promise<TableDTO[]> {
    return this.repo.getAll()
  }

  async toggleIsTaken(id: string): Promise<TableDTO> {
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

  async update(table: Table): Promise<TableDTO> {
    const id = await this.repo.save(table)
    return this.repo.get(id)
  }

  async delete(id: string): Promise<string> {
    return await this.repo.delete(id)
  }
}
