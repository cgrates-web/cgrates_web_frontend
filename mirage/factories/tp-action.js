import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()             { 'tptest'; },
  tag()              { faker.lorem.word(); },
  action()           { '*log'; },
  balance_tag()      { faker.lorem.word(); },
  balance_type()     { '*monetary'; },
  directions()       { '*out'; },
  units()            { `${faker.random.number(1000)}`; },
  expiry_time()      { '*unlimited'; },
  timing_tags()      { faker.lorem.word(); },
  destination_tags() { faker.lorem.word(); },
  rating_subject()   { faker.lorem.word(); },
  categories()       { faker.lorem.word(); },
  shared_groups()    { faker.lorem.word(); },
  balance_weight()   { `${faker.random.number(1000) / 10}`; },
  balance_blocker()  { 'false'; },
  balance_disabled() { 'false'; },
  extra_parameters() { faker.lorem.word(); },
  filter()           { faker.lorem.word(); },
  weight()           { faker.random.number(1000) / 10; },
});
