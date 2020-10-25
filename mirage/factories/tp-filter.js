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
  filterType: '*string',
  filterFieldName() {
    return faker.lorem.word();
  },
  filterFieldValues() {
    return faker.lorem.word();
  },
  activationInterval() {
    return faker.lorem.word();
  },
});
