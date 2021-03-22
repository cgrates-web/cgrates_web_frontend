import Controller from '@ember/controller';
import QueryParams from 'ember-parachute';
import { task } from 'ember-concurrency';
import {
  pipe,
  filter,
  isNil,
  complement,
  isEmpty,
  map,
  sum,
  prop,
  anyPass,
} from 'ramda';
import { renameKeysWith } from 'ramda-adjunct';
import { underscore } from '@ember/string';
import { action } from '@ember/object';
import { tracked, cached } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { DateTime } from 'luxon';

const statsQueryParams = new QueryParams({
  group: {
    refresh: true,
  },
  account: {
    refresh: true,
  },
});

const sumBy = (list, key) => pipe(map(prop(key)), sum)(list);

const prepareQueryParams = pipe(
  filter(complement(anyPass([isEmpty, isNil]))),
  renameKeysWith(underscore)
);

const withoutTitle = {
  title: {
    text: null,
  },
};

class CombinedStat {
  supplierStats = null;
  customerStats = null;

  constructor(customerStats, supplierStats) {
    this.customerStats = customerStats;
    this.supplierStats = supplierStats;
  }

  get cost() {
    return this.supplierStats?.totalCost || 0;
  }

  get income() {
    return this.customerStats?.totalCost || 0;
  }

  get revenue() {
    return this.income - this.cost;
  }

  get marginality() {
    if (this.cost === 0) return 0;
    return (this.revenue / this.cost) * 100;
  }
}

const groupUnitMapper = {
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
}

const compareDates = (dateA, dateB, groupUnit) => {
  const unit = groupUnitMapper[groupUnit];
  return (
    DateTime.fromJSDate(dateA).startOf(unit).valueOf() ===
    DateTime.fromJSDate(dateB).startOf(unit).valueOf()
  );
};

export default class StatisticsIndex extends Controller.extend(
  statsQueryParams.Mixin
) {
  @service intl;

  @service currentUser;

  @tracked
  group = 'daily';

  @tracked
  account = null;

  @tracked
  customerCdrStats = [];

  @tracked
  supplierCdrStats = [];

  @cached
  get totalCalls() {
    return sumBy(this.customerCdrStats, 'totalCount');
  }

  @cached
  get totalUsage() {
    return sumBy(this.customerCdrStats, 'totalUsage');
  }

  @cached
  get totalRejected() {
    return sumBy(this.customerCdrStats, 'totalRejectedDisconnects');
  }

  @cached
  get totalNormalClearing() {
    return sumBy(this.customerCdrStats, 'totalRejectedDisconnects');
  }

  @cached
  get totalErrors() {
    return sumBy(this.customerCdrStats, 'unknownDisconnectsCount');
  }

  @cached
  get totalAnswered() {
    return sumBy(this.customerCdrStats, 'answeredCount');
  }

  @cached
  get avgAsr() {
    return sumBy(this.customerCdrStats, 'asr') / this.customerCdrStats.length;
  }

  @cached
  get avgUsage() {
    return this.totalUsage / this.totalCalls;
  }

  @cached
  get totalCost() {
    return sumBy(this.supplierCdrStats, 'totalCost');
  }

  @cached
  get combinedStats() {
    return this.customerCdrStats.map(
      (customerStat) =>
        new CombinedStat(
          customerStat,
          this.supplierCdrStats.find(({ date }) =>
            compareDates(date, customerStat.date, this.group)
          )
        )
    );
  }

  @cached
  get totalIncome() {
    return sumBy(this.combinedStats, 'income');
  }

  @cached
  get totalRevenue() {
    return sumBy(this.combinedStats, 'revenue');
  }

  @cached
  get totalMarginality() {
    return sumBy(this.combinedStats, 'marginality') / this.combinedStats.length;
  }

  @cached
  get chartOptions() {
    return {
      chart: {
        type: 'column',
      },
      ...withoutTitle,
      xAxis: {
        categories: this.customerCdrStats.map((s) =>
          this.intl.formatDate(s.date)
        ),
        ...withoutTitle,
      },
      yAxis: {
        min: 0,
        ...withoutTitle,
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
        rtl: true,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
          },
        },
      },
    };
  }

  @(task(function* ({ createdAtLte, createdAtGte, group, account }) {
    const {
      customerChargersRunId,
      supplierChargersRunId,
    } = this.currentUser.user.tenant;
    const filter = prepareQueryParams({ account, createdAtLte, createdAtGte });
    this.customerCdrStats = yield this.store.query('cdr-stat', {
      filter: { run_id: customerChargersRunId, ...filter },
      group,
    });
    this.supplierCdrStats = yield this.store.query('cdr-stat', {
      filter: { run_id: supplierChargersRunId, ...filter },
      group,
    });
  }).restartable())
  fetchData;

  setup({ queryParams }) {
    this.fetchData.perform(queryParams);
  }

  queryParamsDidChange({ shouldRefresh, queryParams }) {
    if (shouldRefresh) {
      this.fetchData.perform(queryParams);
    }
  }

  @action
  setFilters({ group, account }) {
    this.group = group;
    this.account = account;
  }
}
