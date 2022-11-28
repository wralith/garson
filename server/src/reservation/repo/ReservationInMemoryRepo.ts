import time from "../../common/util/time"
import { Reservation } from "../core/domain/Reservation"
import { IReservationRepo } from "../core/port/IReservationRepo"

const reservationMap: Map<string, Reservation> = new Map()

export class ReservationInMemoryRepo implements IReservationRepo {
  async getAll(): Promise<Reservation[]> {
    return Array.from(reservationMap.values())
  }

  async getById(id: string): Promise<Reservation> {
    const reservation = reservationMap.get(id)
    if (!reservation) {
      throw new Error(`reservation with id: '${id} not found'`)
    }
    return reservation
  }

  async getByUserId(userId: string): Promise<Reservation[]> {
    const found = Array.from(reservationMap.values()).filter(
      (reservation) => reservation.userId === userId
    )
    if (!found[0]) {
      throw new Error(`no reservations found for user with id: '${userId}'`)
    }
    return found
  }

  async getTodays(): Promise<Reservation[]> {
    const found = Array.from(reservationMap.values()).filter((reservation) =>
      time.isToday(reservation.reservationHour)
    )
    return found
  }

  async save(reservation: Reservation): Promise<string> {
    reservationMap.set(reservation.id, reservation)
    return reservation.id
  }

  async delete(id: string): Promise<string> {
    const isDeleted = reservationMap.delete(id)
    if (!isDeleted) {
      throw new Error(`reservation with id: '${id}' not found`)
    }
    return id
  }
}
