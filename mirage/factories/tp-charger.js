import { Factory, faker } from 'ember-cli-mirage';

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
  filterIds() {
    return `id-${faker.random.number(100)},id-${faker.random.number(100)}`;
  },
  attributeIds() {
    return `id-${faker.random.number(100)},id-${faker.random.number(100)}`;
  },
  activationInterval() {
    return faker.random.number(100);
  },
  runId() {
    return `id-${faker.random.number(100)}`;
  },
  weight() {
    return faker.random.number(1000) / 10;
  },
  createdAt() {
    return faker.date.past();
  },
});
