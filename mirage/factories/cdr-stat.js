import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  date() {
    return faker.date.future();
  },
  totalUsage: 6_000_000_000,
  usageAvg: 6_000_000_000,
  totalCost: 0.6,
  totalCount() {
    return faker.random.number(100);
  },
  totalErrors() {
    return faker.random.number(10);
  },
  totalUnspecifiedDisconnects() {
    return faker.random.number(10);
  },
  totalNormalClearingDisconnects() {
    return faker.random.number(10);
  },
  totalRejectedDisconnects() {
    return faker.random.number(10);
  },
});
