import { User } from "../domain/User"

export interface IUserRepo {
  get(id: string): Promise<User>
  save(user: User): Promise<string>
  delete(id: string): Promise<string>
}
