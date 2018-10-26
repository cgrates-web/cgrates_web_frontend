import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()               { return faker.lorem.word(); },
  tenant()             { return faker.lorem.word(); },
  customId()           { return `id-${faker.random.number(100)}`; },
  contexts()           { return faker.lorem.word(); },
  filterIds()          { return `id-${faker.random.number(100)},id-${faker.random.number(100)}`; },
  activationInterval() { return faker.random.number(100); },
  fieldName()          { return faker.lorem.word(); },
  initial()            { return faker.lorem.word(); },
  substitute()         { return faker.lorem.word(); },
  weight()             { return faker.random.number(1000) / 10; }
});
