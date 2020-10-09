import { Factory, faker } from 'ember-cli-mirage';
const thresholdType = [
  '*min_counter',
  '*max_counter',
  '*min_balance',
  '*max_balance',
];
const balanceTag = ['MONETARY', 'SMS', 'INTERNET', 'INTERNET_TIME', 'MINUTES'];
const balanceType = ['*monetary', '*data', '*sms', '*voice'];
const balanceDirections = ['*in', '*out'];
export default Factory.extend({
  tpid() {
    return faker.lorem.word();
  },
  tag() {
    return `tag-${faker.random.number(100)}`;
  },
  uniqueId() {
    return `unique-id-${faker.random.number(100)}`;
  },
  thresholdType() {
    return faker.random.arrayElement(thresholdType);
  },
  thresholdValue() {
    return faker.random.number(100);
  },
  recurrent() {
    return faker.random.boolean();
  },
  minSleep() {
    return faker.random.number(100);
  },
  expiryTime() {
    return faker.random.number(100);
  },
  activationTime() {
    return faker.random.number(100);
  },
  balanceTag() {
    return faker.random.arrayElement(balanceTag);
  },
  balanceType() {
    return faker.random.arrayElement(balanceType);
  },
  balanceDirections() {
    return faker.random.arrayElement(balanceDirections);
  },
  balanceCategories() {
    return faker.lorem.word();
  },
  balanceDestinationTags() {
    return `destination-id-${faker.random.number(100)}`;
  },
  balanceRatingSubject() {
    return faker.lorem.word();
  },
  balanceSharedGroups() {
    return faker.lorem.word();
  },
  balanceExpiryTime() {
    return faker.random.number(100);
  },
  balanceTimingTags() {
    return `timing-tag-${faker.random.number(100)}`;
  },
  balanceWeight() {
    return faker.random.number(100);
  },
  balanceBlocker() {
    return faker.random.boolean().toString();
  },
  balanceDisabled() {
    return faker.random.boolean().toString();
  },
  minQueuedItems() {
    return faker.random.number(15);
  },
  actionsTag() {
    return `action-tag-${faker.random.number(100)}`;
  },
  weight() {
    return faker.random.number(1000) / 10;
  },
  createdAt() {
    return faker.date.past();
  },
});
