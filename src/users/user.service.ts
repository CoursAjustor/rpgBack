import { createHash } from 'crypto';
import { CharacterModel } from '../models/CharacterModel';
import { User, UserModel } from '../models/UserModel';

export class UserService {
  static async getAll() {
    return await UserModel.find({});
  }

  static async getFiltered(filter: Record<string, any>) {
    return UserModel.find({ ...filter });
  }

  static async getOne(
    filter: Record<string, any>,
    populate: boolean = true,
  ): Promise<User | null> {
    const populateFields = populate ? 'character' : '';
    return (await UserModel.findOne(
      { ...filter },
      'username email character token',
    ).populate(populateFields)) as User;
  }

  static async exists(filter: Record<string, any>) {
    return UserModel.exists({ ...filter });
  }

  static async delete(username: string) {
    const user = await UserService.getOne({ username });
    if (!user) {
      throw {
        status: 'error',
        code: 404,
        message: 'No user found with this username',
      };
    }
    await CharacterModel.deleteOne({ _id: user.character });
    user.delete();
  }

  static async create({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const encrypt = createHash('sha512');
    const character = await CharacterModel.create({});
    return await UserModel.create({
      username,
      email,
      character: character._id,
      password: encrypt.update(password).digest('hex'),
    });
  }
}
