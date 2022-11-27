import { Request, Response } from "express"
import { ITableService } from "../service/TableService"
import { validateCreateTableRequest } from "./Requests"

export class TableController {
  service: ITableService

  constructor(service: ITableService) {
    this.service = service
  }

  createTable = async (req: Request, res: Response) => {
    try {
      const tableReq = req.body
      validateCreateTableRequest(tableReq)

      const id = await this.service.create(tableReq)
      return res.status(201).send({ id: id })
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getAllTables = async (req: Request, res: Response) => {
    try {
      return res.status(200).send(await this.service.getAll())
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  toggleIsTaken = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      return res.status(200).send(await this.service.toggleIsTaken(id))
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }
}
