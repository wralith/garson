import { describe, test, expect } from "@jest/globals"
import { Reservation } from "../core/domain/Reservation"
import { ReservationInMemoryRepo } from "./ReservationInMemoryRepo"

const dayInMs = 1000 * 60 * 60 * 24

const dummy = Reservation.create({
  reservationHour: new Date(),
  guestCount: 4,
  tableId: "123456789",
  userId: "123123123123",
})

const dummyYesterday = Reservation.create({
  reservationHour: new Date(Date.now() - dayInMs),
  guestCount: 4,
  tableId: "123123123",
  userId: "123123111",
})

describe("src/reservation/repo/ReservationInMemoryRepo", () => {
  const repo = new ReservationInMemoryRepo()

  test("save, get, delete reservation", async () => {
    const id = await repo.save(dummy)
    await repo.save(dummyYesterday)
    const reservation = await repo.getById(id)
    expect(reservation.userId).toBe(dummy.userId)

    const [sameReservation] = await repo.getByUserId(dummy.userId)
    expect(reservation.equals(sameReservation)).toBeTruthy()

    expect((await repo.getTodays()).length).toBe(1)
    expect((await repo.getAll()).length).toBe(2)

    await repo.delete(id)

    expect(async () => await repo.getById(id)).rejects.toThrow(Error)
    expect(async () => await repo.getByUserId(id)).rejects.toThrow(Error)
    expect(async () => await repo.delete(id)).rejects.toThrow(Error)
    expect((await repo.getTodays()).length).toBe(0)
    expect((await repo.getAll()).length).toBe(1)
  })
})
