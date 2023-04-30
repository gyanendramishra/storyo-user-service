import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserType } from './user.schema';
import { UserResponse } from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserType>,
  ) {}

  async getUserById(id: string): Promise<UserResponse<UserType>> {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) {
      return {
        data: undefined,
        error: ['User not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return { data: user, error: undefined, status: HttpStatus.OK };
  }

  async getAllUsers(): Promise<UserType[]> {
    return await this.userModel.find().lean().exec();
  }
}
