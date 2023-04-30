export class CreateUserCommand {
  constructor(public readonly name: string, private readonly email: string) {}
}

export class GetUserQuery {
  constructor(public readonly id: string) {}
}
