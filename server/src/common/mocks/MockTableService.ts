import { jest } from "@jest/globals"
import { TableDTO } from "../../table/service/TableDTO"
import { ITableService } from "../../table/service/TableService"

export const dummyTable: TableDTO = {
  id: "1",
  name: "Garden-1",
  seats: 4,
  isTaken: false,
}

export const MockTableService: ITableService = {
  getById: jest.fn(async () => {
    return dummyTable
  }),

  getAll: jest.fn(async () => {
    return [dummyTable]
  }),

  toggleIsTaken: jest.fn(async () => {
    const res = structuredClone(dummyTable)
    res.isTaken = true
    return res
  }),

  create: jest.fn(async () => {
    return dummyTable.id
  }),

  update: jest.fn(async () => {
    return dummyTable
  }),

  delete: jest.fn(async () => {
    return dummyTable.id
  }),
}
