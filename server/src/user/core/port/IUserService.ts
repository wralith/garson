import { User } from "../domain/User"

export interface IUserService {
  getUser(id: string): Promise<User>
  createUser(firstName: string, lastName: string, email: string): Promise<string>
  validateUser(email: string): Promise<boolean>
}
