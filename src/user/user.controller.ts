import { Inject, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserType } from './user.schema';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './commands/user-command';
import {
  Empty,
  UserResponse,
  UserById,
  UserList,
  USER_SERVICE_NAME,
} from './interface';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'GetUserById')
  async getUserById(request: UserById): Promise<UserResponse<UserType>> {
    return this.queryBus.execute(new GetUserQuery(request.id));
    // return await this.service.getUserById(request.id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetAllUsers')
  async getAllUsers(_: Empty): Promise<UserList<UserType>> {
    const users = await this.service.getAllUsers();
    return { users };
  }
}
