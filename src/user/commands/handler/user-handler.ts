import { Injectable } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  QueryHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { CreateUserCommand, GetUserQuery } from '../user-command';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/user.schema';
import { UserResponse } from 'src/user/interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // const { name, email } = command;
    // await this.userService.createUser(name, email);
  }
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  execute(query: GetUserQuery): Promise<UserResponse<UserType>> {
    const { id } = query;
    return this.userService.getUserById(id);
  }
}
