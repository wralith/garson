import { User } from "../core/domain/User"
import { IUserRepo } from "../core/port/IUserRepo"

const userMap: Map<string, User> = new Map()

export class UserInMemoryRepo implements IUserRepo {
  async get(id: string): Promise<User> {
    const user = userMap.get(id)
    if (!user) {
      throw new Error(`user with id: '${id}' not found`)
    }
    return user
  }

  async getByEmail(email: string): Promise<User> {
    const found = Array.from(userMap.values()).filter((user) => user.email === email)
    if (!found[0]) {
      throw new Error(`user with email: '${email}' not found`)
    }
    return found[0]
  }

  async save(user: User): Promise<string> {
    userMap.set(user.id, user)
    return user.id
  }

  async delete(id: string): Promise<string> {
    const isDeleted = userMap.delete(id)
    if (!isDeleted) {
      throw new Error(`user with id: '${id}' not found`)
    }
    return id
  }
}
