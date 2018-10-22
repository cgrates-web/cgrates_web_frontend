import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()             { return 'tptest'; },
  tag()              { return faker.lorem.word(); },
  action:            '*log',
  balance_tag()      { return faker.lorem.word(); },
  balance_type:      '*monetary',
  directions:        '*out',
  units()            { return `${faker.random.number(1000)}`; },
  expiry_time:       '*unlimited',
  timing_tags()      { return faker.lorem.word(); },
  destination_tags() { return faker.lorem.word(); },
  rating_subject()   { return faker.lorem.word(); },
  categories()       { return faker.lorem.word(); },
  shared_groups()    { return faker.lorem.word(); },
  balance_weight()   { return `${faker.random.number(1000) / 10}`; },
  balance_blocker:   'false',
  balance_disabled:  'false',
  extra_parameters() { return faker.lorem.word(); },
  filter()           { return faker.lorem.word(); },
  weight()           { return faker.random.number(1000) / 10; },
});
