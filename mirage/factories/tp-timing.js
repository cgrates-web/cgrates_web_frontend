import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid: 'tptest',
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  years() {
    return faker.lorem.word();
  },
  months() {
    return faker.lorem.word();
  },
  monthDays() {
    return faker.lorem.word();
  },
  weekDays() {
    return faker.lorem.word();
  },
  time() {
    return faker.lorem.word();
  },
});
