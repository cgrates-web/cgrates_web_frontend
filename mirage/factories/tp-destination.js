import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  prefix() {
    return faker.random.number(100);
  },
});
