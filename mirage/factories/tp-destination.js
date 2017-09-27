import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()   { 'tptest' },
  tag()    { faker.lorem.word() },
  prefix() { faker.random.number(100) }
});
