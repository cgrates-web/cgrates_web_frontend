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
  activationInterval() {
    return faker.lorem.word();
  },
  cgType() {
    return faker.lorem.word();
  },
  element() {
    return faker.lorem.word();
  },
  values() {
    return faker.lorem.word();
  },
});
