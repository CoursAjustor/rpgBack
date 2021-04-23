import { createHash } from 'crypto';
import { isBefore } from 'date-fns';
import { v4 } from 'uuid';
import { UserModel } from '../models/UserModel';
import { User } from './interfaces/user.interface';

export class LoginService {
  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    const encryptedPassword = createHash('sha512')
      .update(password)
      .digest('hex');

    const user: User = await UserModel.findOne(
      {
        username,
        password: encryptedPassword,
      },
      'username token email character tokenValidity',
    )
      .populate('character')
      .lean();

    if (!user) {
      throw {
        status: 'error',
        code: 403,
        message: 'No user found with this credentials',
      };
    }

    const date = new Date();

    if (isBefore(date, user.tokenValidity)) {
      return user;
    }

    const token = v4();

    await UserModel.updateOne(
      { _id: user._id },
      { token, tokenValidity: date.setDate(date.getDate() + 1) },
    );

    return { ...user, token };
  }
}
