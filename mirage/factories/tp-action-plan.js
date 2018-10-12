import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid:         'tptest',
  tag()         { return faker.lorem.word(); },
  actions_tag() { return faker.lorem.word(); },
  timing_tag()  { return faker.lorem.word(); },
  weight()      { return faker.random.number(1000) / 10; },
});
