import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  cgrid()             { return faker.random.alphaNumeric(); },
  run_id:              '*default',
  origin_host()       { return faker.internet.ip(); },
  source()            { return faker.lorem.word(); },
  origin_id()         { return faker.random.uuid(); },
  tor:                '*voice',
  request_type:       '*prepaid',
  direction:          '*out',
  tenant:             'cgrates.org',
  category:           'call',
  account()           { return faker.random.alphaNumeric(); },
  subject()           { return faker.random.alphaNumeric(); },
  destination()       { return faker.phone.phoneNumber(); },
  setup_time()        { return faker.date.past(); },
  pdd()               { return faker.random.number(100) / 10; },
  answer_time()       { return faker.date.past(); },
  usage()             { return faker.random.number(1000) / 10; },
  supplier()          { return faker.lorem.word(); },
  disconnect_cause()  { return 'NORMAL_CLEARING'; },
  extra_fields:       '{}',
  cost_sourc:         'CDRS',
  cost()              { return faker.random.number(10) / 10; },
  cost_details:       'null',
  account_summary:    'null',
  extra_info:         ''
});
