import faker from 'faker';
import { UserDocument } from '../models/UserModel';

export class UserFactory {
  static generate(): UserDocument {
    return {
      username: faker.lorem.word(),
      email: faker.internet.email(),
      token: faker.datatype.uuid(),
      tokenValidity: faker.date.recent().toISOString(),
      character: {},
    } as UserDocument;
  }

  static generateArray(length: number = 10) {
    return Array.from({ length }, () => UserFactory.generate());
  }
}
