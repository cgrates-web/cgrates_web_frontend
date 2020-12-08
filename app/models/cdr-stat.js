import Model, { attr } from '@ember-data/model';

export default class CdrStat extends Model {
  @attr('date') date;
  @attr('number') totalUsage;
  @attr('number') usageAvg;
  @attr('number') totalCost;
};
