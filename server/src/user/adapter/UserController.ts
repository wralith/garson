import { Request, Response } from "express"
import { ZodError } from "zod"
import { IUserService } from "../core/port/IUserService"
import { RegisterRequest, validateRegisterRequest } from "./Requests"

export class UserController {
  service: IUserService

  constructor(service: IUserService) {
    this.service = service
  }

  register = async (req: Request, res: Response) => {
    try {
      const userReq: RegisterRequest = req.body
      validateRegisterRequest(userReq)

      const id = await this.service.createUser(userReq.firstName, userReq.lastName, userReq.email)
      return res.status(201).send({ id: id })
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ message: err.issues[0].message })
      }
      return res.status(500).send({ message: "unexpected error" })
    }
  }
}
