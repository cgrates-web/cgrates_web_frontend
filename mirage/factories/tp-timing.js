import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid:       'tptest',
  tag()       { return faker.lorem.word(); },
  years()     { return faker.lorem.word(); },
  months()    { return faker.lorem.word(); },
  monthDays() { return faker.lorem.word(); },
  weekDays()  { return faker.lorem.word(); },
  time()      { return faker.lorem.word(); }
});
