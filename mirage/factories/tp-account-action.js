import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()                { return faker.lorem.word(); },
  tenant()              { return faker.lorem.word(); },
  loadid()              { return faker.lorem.word(); },
  account()             { return faker.finance.accountName(); },
  actionPlanTag()       { return `tag-${faker.random.number(100)}`; },
  actionTriggersTag()   { return `tag-${faker.random.number(100)}`; },
  allowNegative()       { return faker.random.boolean(0); },
  disabled()            { return faker.random.boolean(0); },
  createdAt()           { return faker.date.past(); }
});
