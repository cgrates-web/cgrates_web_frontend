import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()   { return faker.lorem.word(); },
  tag()    { return `tag-${faker.random.number(100)}`; },
  prefix() { return faker.random.number(100); }
});
