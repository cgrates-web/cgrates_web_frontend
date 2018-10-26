import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()               { return faker.lorem.word(); },
  tenant()             { return faker.lorem.word(); },
  customId()           { return `id-${faker.random.number(100)}`; },
  filterIds()          { return `id-${faker.random.number(100)},id-${faker.random.number(100)}`; },
  activationInterval() { return faker.random.number(100); },
  usageTtl()           { return faker.lorem.word(); },
  limit()              { return faker.lorem.word(); },
  allocationMessage()  { return faker.lorem.word(); },
  thresholdIds()       { return `id-${faker.random.number(100)},id-${faker.random.number(100)}`; },
  weight()             { return faker.random.number(1000) / 10; },
  createdAt()          { return faker.date.past(); }
});
