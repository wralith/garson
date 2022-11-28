import { Reservation } from "../domain/Reservation"
import { IReservationRepo } from "../port/IReservationRepo"
import { ReservationInMemoryRepo } from "../../repo/ReservationInMemoryRepo"
import { IReservationService } from "../port/IReservationService"
import { CreateReservationDTO, ReservationDTO } from "./ReservationDTO"

import { ITableService } from "../../../table/service/TableService"
import { IUserService } from "../../../user/core/port/IUserService"

export class ReservationService implements IReservationService {
  repo: IReservationRepo
  tableService: ITableService
  userService: IUserService

  constructor(
    repo: ReservationInMemoryRepo,
    tableService: ITableService,
    userService: IUserService
  ) {
    ;(this.repo = repo), (this.tableService = tableService), (this.userService = userService)
  }

  async getById(id: string): Promise<ReservationDTO> {
    const reservation = await this.repo.getById(id)
    const dto = await this.composeReservation(reservation)

    return dto
  }

  async getByUserId(userId: string): Promise<ReservationDTO[]> {
    const reservations = await this.repo.getByUserId(userId)
    const dtos = this.composeReservations(reservations)

    return dtos
  }

  async getTodays(): Promise<ReservationDTO[]> {
    const reservations = await this.repo.getTodays()
    const dtos = this.composeReservations(reservations)

    return dtos
  }

  async create(
    reservationHour: Date,
    guestCount: number,
    userId: string,
    tableId: string
  ): Promise<string> {
    await this.userService.getUser(userId).catch(() => {
      throw new Error("invalid user id")
    })
    await this.tableService.getById(tableId).catch(() => {
      throw new Error("invalid table id")
    })

    const reservation = Reservation.create({
      reservationHour: new Date(reservationHour),
      guestCount,
      userId,
      tableId,
    })

    return this.repo.save(reservation)
  }

  async delete(id: string): Promise<string> {
    return this.repo.delete(id)
  }

  private async composeReservation(reservation: Reservation): Promise<ReservationDTO> {
    const user = await this.userService.getUser(reservation.userId)
    const table = await this.tableService.getById(reservation.tableId)
    const dto = CreateReservationDTO(reservation, user, table)

    return dto
  }

  private async composeReservations(reservations: Reservation[]): Promise<ReservationDTO[]> {
    let dtos: ReservationDTO[] = []
    await Promise.all(
      reservations.map(async (res) => {
        const v = await this.composeReservation(res)
        dtos = [...dtos, v]
      })
    )

    return dtos
  }
}
