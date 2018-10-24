import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid:    'tptest',
  tag()    { return faker.lorem.word(); },
  prefix() { return faker.random.number(100); }
});
