import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tenant() {
    return faker.lorem.word();
  },
  direction() {
    return faker.phone.phoneNumber();
  },
  category() {
    return faker.lorem.word();
  },
  account() {
    return faker.finance.accountName();
  },
  subject() {
    return faker.lorem.word();
  },
  destinationId() {
    return faker.lorem.word();
  },
  context() {
    return faker.lorem.word();
  },
  target() {
    return faker.lorem.word();
  },
  original() {
    return faker.lorem.word();
  },
  alias() {
    return faker.lorem.word();
  },
  weight() {
    return faker.random.number(1000) / 10;
  },
  createdAt() {
    return faker.date.past();
  },
});
