import { describe, test, expect } from "@jest/globals"
import { Reservation, ReservationProps } from "./Reservation"

describe("reservation entity class", () => {
  test("fails if given data is invalid", () => {
    const invalid = () =>
      Reservation.create({
        reservationHour: new Date(),
        guestCount: -3,
        tableId: "12312",
        userId: "1231",
      })
    expect(invalid).toThrow()
  })

  test("successful", () => {
    const props: ReservationProps = {
      reservationHour: new Date(),
      guestCount: 5,
      tableId: "test-test",
      userId: "test-test",
    }

    const reservation = Reservation.create(props)
    expect(reservation.tableId).toBe(props.tableId)
    expect(reservation.guestCount).toBe(props.guestCount)
  })
})
