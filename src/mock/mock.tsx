import {faker} from '@faker-js/faker';
import {Mock} from '../env';


faker.setLocale('zh_CN');

export {mockSession} from './mockSession';

export const mockTagIndex: Mock = (config) => {
  let id = 0;
  const createId = () => {
    id += 1;
    return id;
  };
  const createTag = (n = 1, attrs?: any) =>
    Array.from({length: n}).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }));

  if (config.params.kind === 'expenses') {
    return [200, {resources: createTag(7)}];
  } else {
    return [200, {resources: createTag(20)}];
  }

};