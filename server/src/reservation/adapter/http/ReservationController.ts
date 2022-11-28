import { Request, Response } from "express"
import { ZodError } from "zod"
import { IReservationService } from "../../core/port/IReservationService"
import { CreateReservationRequest, validateCreateReservationRequest } from "./Request"

export class ReservationController {
  service: IReservationService

  constructor(service: IReservationService) {
    this.service = service
  }

  createReservation = async (req: Request, res: Response) => {
    try {
      const input: CreateReservationRequest = req.body
      validateCreateReservationRequest(input)

      const id = await this.service.create(
        input.reservationHour,
        input.guestCount,
        input.userId,
        input.tableId
      )

      return res.status(201).send({ id: id })
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ message: err.issues[0].message })
      }
      if (err instanceof Error) {
        return res.status(500).send({ message: err.message })
      }
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getUsersReservations = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId
      const reservations = await this.service.getByUserId(userId)
      return res.status(200).send(reservations)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  getTodaysReservations = async (req: Request, res: Response) => {
    try {
      const reservations = await this.service.getTodays()
      return res.status(200).send(reservations)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).send({ message: err.message })
      }
      return res.status(500).send({ message: "unexpected error" })
    }
  }

  deleteReservation = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      await this.service.delete(id)
      return res.status(200).send(id)
    } catch (err) {
      return res.status(500).send({ message: "unexpected error" })
    }
  }
}
