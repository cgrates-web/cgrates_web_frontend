import Model, { attr } from '@ember-data/model';

export default class CdrStat extends Model {
  @attr('date') date;
  @attr('number') totalUsage;
  @attr('number') usageAvg;
  @attr('number') totalCost;
  @attr('number') totalCount;
  @attr('number') totalErrors;
  @attr('number') totalCount;
  @attr('number') totalUnspecifiedDisconnects;
  @attr('number') totalNormalClearingDisconnects;
  @attr('number') totalRejectedDisconnects;

  get unknownDisconnectsCount() {
    return this.totalErrors + this.totalUnspecifiedDisconnects;
  }

  get answeredCount() {
    const totalDisconnects =
      this.totalErrors +
      this.totalNormalClearingDisconnects +
      this.totalUnspecifiedDisconnects +
      this.totalRejectedDisconnects;
    return this.totalCount - totalDisconnects;
  }

  get asr() {
    return (this.answeredCount / this.totalCount) * 100;
  }
}
