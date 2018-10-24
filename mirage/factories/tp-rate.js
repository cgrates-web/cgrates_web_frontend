import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()                 { 'tptest'; },
  tag()                  { faker.lorem.word(); },
  rate_unit()            { '60s'; },
  rate_increment()       { '60s'; },
  rate()                 { faker.random.number(100) / 100; },
  group_interval_start() { '60s'; },
  connect_fee()          { faker.random.number(100) / 100; }
});
