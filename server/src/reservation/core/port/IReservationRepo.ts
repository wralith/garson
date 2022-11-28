import { Reservation } from "../domain/Reservation"

export interface IReservationRepo {
  getAll(): Promise<Reservation[]>
  getById(id: string): Promise<Reservation>
  getByUserId(userId: string): Promise<Reservation[]>
  getTodays(): Promise<Reservation[]>
  save(reservation: Reservation): Promise<string>
  delete(id: string): Promise<string>
}
