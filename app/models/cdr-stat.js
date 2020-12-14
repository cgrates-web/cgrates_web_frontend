import Model, { attr } from '@ember-data/model';

export default class CdrStat extends Model {
  @attr('date') date;
  @attr('number') totalUsage;
  @attr('number') usageAvg;
  @attr('number') totalCost;
  @attr('number') totalCount;
  @attr('number') totalErrors;

  get answeredCount() {
    return this.totalCount - this.totalErrors;
  }

  get asr() {
    return (this.answeredCount / this.totalCount) * 100;
  }
}
