import { IUserRepo } from "../port/IUserRepo"
import { User } from "../domain/User"
import { IUserService } from "../port/IUserService"

export class UserService implements IUserService {
  repo: IUserRepo

  constructor(repo: IUserRepo) {
    this.repo = repo
  }

  async getUser(id: string): Promise<User> {
    return this.repo.get(id)
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
