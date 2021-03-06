import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  account() {
    return faker.lorem.word();
  },
  strategy() {
    return faker.lorem.word();
  },
  ratingSubject() {
    return faker.lorem.word();
  },
  createdAt() {
    return faker.date.past();
  },
});
