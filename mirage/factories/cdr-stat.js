import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  date() {
    return new Date();
  },
  totalUsage: 6_000_000_000,
  usageAvg: 6_000_000_000,
  totalCost: 0.6,
});
