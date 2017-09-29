import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()      { 'tptest' },
  tag()       { faker.lorem.word() },
  years()     { faker.lorem.word() },
  months()    { faker.lorem.word() },
  monthDays() { faker.lorem.word() },
  weekDays()  { faker.lorem.word() },
});
