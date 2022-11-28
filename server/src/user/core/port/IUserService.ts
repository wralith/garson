import { UserDTO } from "../service/UserDTO"

export interface IUserService {
  getUser(id: string): Promise<UserDTO>
  createUser(firstName: string, lastName: string, email: string): Promise<string>
  validateUser(email: string): Promise<boolean>
}
