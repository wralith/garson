import { ReservationDTO } from "../service/ReservationDTO"

export interface IReservationService {
  getById(id: string): Promise<ReservationDTO>
  getByUserId(userId: string): Promise<ReservationDTO[]>
  getTodays(): Promise<ReservationDTO[]>
  create(
    reservationHour: Date,
    guestCount: number,
    userId: string,
    tableId: string
  ): Promise<string>
  delete(id: string): Promise<string>
}
