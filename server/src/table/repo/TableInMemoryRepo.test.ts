import { describe, test, expect } from "@jest/globals"
import { Table } from "../domain/Table"
import { TableInMemoryRepo } from "./TableInMemoryRepo"

const dummy = Table.create(
  {
    name: "Garden-1",
    isTaken: false,
    seats: 3,
  },
  "1"
)

describe("src/table/repo/TableInMemoryRepo", () => {
  const repo = new TableInMemoryRepo()

  test("save, get, delete table", async () => {
    await repo.save(dummy)
    const tables = await repo.getAll()
    const table = await repo.get("1")
    expect(tables[0].equals(table)).toBe(true)
    expect(tables.length).toBe(1)

    await repo.delete(table.id)
    expect(async () => await repo.delete(table.id)).rejects.toThrow()
    expect(async () => await repo.get(table.id)).rejects.toThrow()
    expect((await repo.getAll()).length).toBe(0)
  })
})
