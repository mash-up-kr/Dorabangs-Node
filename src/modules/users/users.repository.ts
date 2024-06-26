import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@src/infrastructure';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOrCreate(deviceToken: string) {
    const user = await this.userModel
      .findOne({
        deviceToken: deviceToken,
      })
      .lean();
    if (user) {
      return user;
    }
    const newUser = await this.userModel.create({
      deviceToken: deviceToken,
    });
    return newUser;
  }
}
