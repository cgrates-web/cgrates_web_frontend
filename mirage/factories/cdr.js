import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  cgrid()            { faker.random.alphaNumeric() },
  run_id()           { '*default' },
  origin_host()      { faker.internet.ip() },
  source()           { faker.lorem.word() },
  origin_id()        { faker.random.uuid() },
  tor()              { '*voice' },
  request_type()     { '*prepaid' },
  direction()        { '*out' },
  tenant()           { 'cgrates.org' },
  category()         { 'call' },
  account()          { faker.random.alphaNumeric() },
  subject()          { faker.random.alphaNumeric() },
  destination()      { faker.phone.phoneNumber() },
  setup_time()       { faker.date.past() },
  pdd()              { faker.random.number(100) / 10 },
  answer_time()      { faker.date.past() },
  usage()            { faker.random.number(1000) / 10 },
  supplier()         { faker.lorem.word() },
  disconnect_cause() { 'NORMAL_CLEARING' },
  extra_fields()     { '{}' },
  cost_source()      { 'CDRS' },
  cost()             { faker.random.number(10) / 10 },
  cost_details()     { 'null' },
  account_summary()  { 'null' },
  extra_info()       { '' }
});
