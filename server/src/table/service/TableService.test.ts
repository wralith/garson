import { describe, test, expect } from "@jest/globals"
import { Table } from "../domain/Table"
import { TableInMemoryRepo } from "../repo/TableInMemoryRepo"
import { TableService } from "./TableService"

const dummy = Table.create({
  name: "Garden-1",
  isTaken: false,
  seats: 3,
})

describe("src/table/service/TableService", () => {
  const repo = new TableInMemoryRepo()
  const service = new TableService(repo)

  test("create, get, toggle, delete table", async () => {
    const id = await service.create(dummy)
    let tables = await service.getAll()
    const table = tables[0]

    expect(table.name).toBe(dummy.name)
    expect(tables.length).toBe(1)

    await service.toggleIsTaken(id)
    let sameTable = await service.getAll().then((t) => t[0])
    expect(table.equals(sameTable)).toBe(true)
    expect(sameTable.isTaken).toBe(true)
    table.name = "Roof-2"
    sameTable = await service.update(table)
    expect(sameTable.name).toBe("Roof-2")

    await service.delete(id)
    tables = await service.getAll()
    expect(tables.length).toBe(0)
    expect(async () => service.delete(id)).rejects.toThrow()
  })
})
