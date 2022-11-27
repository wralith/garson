import { describe, test, expect } from "@jest/globals"
import { Table } from "./Table"

describe("Table entity class", () => {
  test("create() should return new table entity", () => {
    const name = "Garden-1"
    let table = Table.create({ name, seats: 4, isTaken: true })
    expect(table.name).toBe(name)
    expect(table.isTaken).toBe(true)

    table = Table.create({ name, seats: 4, isTaken: false }, "1")
    expect(table.id).toBe("1")
  })
})
