import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(gmail: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ gmail, password: hashedPassword });
  }
  async login(gmail: string, password: string) {
    const user = await this.userModel.findOne({ gmail });
    if (!user) {
      throw new Error('User not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
