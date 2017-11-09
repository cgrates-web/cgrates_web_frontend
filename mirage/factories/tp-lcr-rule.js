import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  tpid()            { 'tptest' },
  direction()       { '*out' },
  tenant()          { 'cgrates.org' },
  category()        { 'call' },
  account()         { '*any' },
  subject()         { '*any' },
  destination_tag() { '*any' },
  rp_category()     { faker.lorem.word() },
  strategy()        { '*qos' },
  strategy_params() { '' },
  activation_time() { faker.date.future() },
  weight()          { faker.random.number(1000) / 10 }
});
