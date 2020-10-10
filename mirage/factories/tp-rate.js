import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid: 'tptest',
  tag() {
    return faker.lorem.word();
  },
  rate_unit: '60s',
  rate_increment: '60s',
  rate() {
    return faker.random.number(100) / 100;
  },
  group_interval_start: '60s',
  connect_fee() {
    return faker.random.number(100) / 100;
  },
});
