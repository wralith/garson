import { describe, test, expect } from "@jest/globals"
import { MockTableService } from "../../../common/mocks/MockTableService"
import { MockUserService } from "../../../common/mocks/MockUserService"
import { ReservationInMemoryRepo } from "../../repo/ReservationInMemoryRepo"
import { Reservation } from "../domain/Reservation"
import { ReservationService } from "./ReservationService"

const dummy = Reservation.create({
  reservationHour: new Date(),
  guestCount: 4,
  tableId: "123123123123",
  userId: "user-1-123456",
})

describe("src/reservation/core/service/ReservationService", () => {
  const repo = new ReservationInMemoryRepo()
  const service = new ReservationService(repo, MockTableService, MockUserService)

  test("create, getById, getByUserID, getTodays, delete", async () => {
    const id = await service.create(
      dummy.reservationHour,
      dummy.guestCount,
      dummy.userId,
      dummy.tableId
    )
    const reservation = await service.getById(id)
    expect(reservation.id).toBe(id)
    expect(reservation.table.name).toBe("Garden-1")

    const byUserId = await service.getByUserId(dummy.userId)
    expect(byUserId[0]).toStrictEqual(reservation)

    let todays = await service.getTodays()
    expect(todays.length).toBe(1)

    await service.delete(id)
    todays = await service.getTodays()
    expect(todays.length).toBe(0)
  })
})
