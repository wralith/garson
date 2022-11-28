import { TableDTO } from "../../../table/service/TableDTO"
import { UserDTO } from "../../../user/core/service/UserDTO"
import { Reservation } from "../domain/Reservation"

export interface ReservationDTO {
  id?: string
  reservationHour: Date
  guestCount: number
  user: UserDTO
  table: TableDTO
}

export function CreateReservationDTO(
  rsrv: Reservation,
  user: UserDTO,
  table: TableDTO
): ReservationDTO {
  return {
    id: rsrv.id,
    reservationHour: rsrv.reservationHour,
    guestCount: rsrv.guestCount,
    user: user,
    table: table,
  }
}

export class ReservationMap {
  public static toDomain(dto: ReservationDTO) {
    return Reservation.create(
      {
        reservationHour: dto.reservationHour,
        guestCount: dto.guestCount,
        userId: dto.user.id,
        tableId: dto.table.id,
      },
      dto.id
    )
  }
}
