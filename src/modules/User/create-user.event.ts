import { CreateUser } from "./create-user"

export class CreateUserEvent {
  constructor(public readonly userCreate : CreateUser) {}
}
