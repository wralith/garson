import { IUserRepo } from "../port/IUserRepo"
import { IUserService } from "../port/IUserService"
import { User } from "../domain/User"
import { UserDTO, UserMap } from "./UserDTO"

export class UserService implements IUserService {
  repo: IUserRepo

  constructor(repo: IUserRepo) {
    this.repo = repo
  }

  async getUser(id: string): Promise<UserDTO> {
    const user = await this.repo.get(id)
    return UserMap.toDto(user)
  }

  async createUser(firstName: string, lastName: string, email: string): Promise<string> {
    const user = User.create({ firstName, lastName, email })
    return this.repo.save(user)
  }

  // TODO: Authentication
  async validateUser(email: string): Promise<boolean> {
    try {
      await this.repo.getByEmail(email)
      return true
    } catch (err) {
      return false
    }
  }
}
