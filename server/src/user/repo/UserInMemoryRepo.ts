import { User } from "../domain/User"
import { IUserRepo } from "../port/IUserRepo"

const userMap: Map<string, User> = new Map()

export class UserInMemoryRepo implements IUserRepo {
  async get(id: string): Promise<User> {
    const user = userMap.get(id)
    if (!user) {
      throw new Error(`user with id '${id}' not found`)
    }
    return user
  }

  async save(user: User): Promise<string> {
    userMap.set(user.id, user)
    return user.id
  }

  async delete(id: string): Promise<string> {
    const isDeleted = userMap.delete(id)
    if (!isDeleted) {
      throw new Error(`user with id '${id}' not found`)
    }
    return id
  }
}
