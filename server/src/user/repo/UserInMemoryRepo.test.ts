import { describe, test, expect } from "@jest/globals"
import { User } from "../core/domain/User"
import { UserInMemoryRepo } from "./UserInMemoryRepo"

describe("src/repo/UserInMemoryRepo", () => {
  const repo = new UserInMemoryRepo()

  const dummy = User.create({
    firstName: "test",
    lastName: "test",
    email: "test@mail.com",
    roles: 0,
  })

  test("save, get, delete user", async () => {
    const id = await repo.save(dummy)
    const user = await repo.get(id)
    expect(user.email).toBe(dummy.email)

    const sameUser = await repo.getByEmail(dummy.email)
    expect(user.equals(sameUser)).toBeTruthy()

    await repo.delete(id)
    expect(async () => await repo.get(id)).rejects.toThrow(Error)
    expect(async () => await repo.getByEmail(dummy.email)).rejects.toThrow(Error)
    expect(async () => await repo.delete(id)).rejects.toThrow(Error)
  })
})
