import { z } from "zod"
import { Entity } from "../../../common/domain/Entity"

const reservationSchema = z.object({
  reservationHour: z.date(),
  guestCount: z.number().positive(),
  userId: z.string().min(9),
  tableId: z.string().min(9),
})

export type ReservationProps = z.infer<typeof reservationSchema>

export class Reservation extends Entity<ReservationProps> {
  reservationHour: Date
  guestCount: number
  userId: string
  tableId: string

  private constructor(props: ReservationProps, id?: string) {
    super(id)
    this.reservationHour = props.reservationHour
    this.guestCount = props.guestCount
    this.userId = props.userId
    this.tableId = props.tableId
  }

  public static create(props: ReservationProps, id?: string) {
    reservationSchema.parse(props) // throws if fail
    return new Reservation(props, id)
  }
}
