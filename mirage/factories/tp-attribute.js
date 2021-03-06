import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tenant() {
    return faker.lorem.word();
  },
  customId() {
    return `id-${faker.random.number(100)}`;
  },
  contexts() {
    return faker.lorem.word();
  },
  filterIds() {
    return `id-${faker.random.number(100)},id-${faker.random.number(100)}`;
  },
  activationInterval() {
    return faker.random.number(100);
  },
  weight() {
    return faker.random.number(1000) / 10;
  },
  path() {
    return faker.lorem.word();
  },
  type() {
    return faker.lorem.word();
  },
  value() {
    return faker.lorem.word();
  },
});
