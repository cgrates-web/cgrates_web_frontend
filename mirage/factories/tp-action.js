import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  action: '*log',
  balance_tag() {
    return faker.lorem.word();
  },
  balance_type: '*monetary',
  units() {
    return `${faker.random.number(1000)}`;
  },
  expiry_time: '*unlimited',
  timing_tags() {
    return faker.lorem.word();
  },
  destination_tags() {
    return faker.lorem.word();
  },
  rating_subject() {
    return faker.lorem.word();
  },
  categories() {
    return faker.lorem.word();
  },
  shared_groups() {
    return faker.lorem.word();
  },
  balance_weight() {
    return `${faker.random.number(1000) / 10}`;
  },
  balance_blocker: 'false',
  balance_disabled: 'false',
  extra_parameters() {
    return faker.lorem.word();
  },
  filter() {
    return faker.lorem.word();
  },
  weight() {
    return faker.random.number(1000) / 10;
  },
});
