import { Inject, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserType } from './user.schema';
import {
  Empty,
  UserResponse,
  UserById,
  UserList,
  USER_SERVICE_NAME,
} from './interface';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'GetUserById')
  async getUserById(request: UserById): Promise<UserResponse<UserType>> {
    return await this.service.getUserById(request.id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetAllUsers')
  async getAllUsers(_: Empty): Promise<UserList<UserType>> {
    const users = await this.service.getAllUsers();
    return { users };
  }
}
