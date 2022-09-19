import {faker} from '@faker-js/faker';
import {Mock} from '../env';

export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }];
};