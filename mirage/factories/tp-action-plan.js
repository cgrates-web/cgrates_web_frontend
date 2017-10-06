import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()        { 'tptest' },
  tag()         { faker.lorem.word() },
  actions_tag() { faker.lorem.word() },
  timing_tag()  { faker.lorem.word() },
  weight()      { faker.random.number(1000) / 10 },
});
