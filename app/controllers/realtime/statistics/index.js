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

export default class StatisticsIndex extends Controller.extend(
  statsQueryParams.Mixin
) {
  @service intl;

  @tracked
  group = 'daily';

  @tracked
  account = null;

  @tracked
  cdrStats = [];

  @cached
  get totalCalls() {
    return sumBy(this.cdrStats, 'totalCount');
  }

  @cached
  get totalUsage() {
    return sumBy(this.cdrStats, 'totalUsage');
  }

  @cached
  get totalRejected() {
    return sumBy(this.cdrStats, 'totalRejectedDisconnects');
  }

  @cached
  get totalNormalClearing() {
    return sumBy(this.cdrStats, 'totalRejectedDisconnects');
  }

  @cached
  get totalErrors() {
    return sumBy(this.cdrStats, 'unknownDisconnectsCount');
  }

  @cached
  get totalAnswered() {
    return sumBy(this.cdrStats, 'answeredCount');
  }

  @cached
  get avgAsr() {
    return sumBy(this.cdrStats, 'asr') / this.cdrStats.length;
  }

  @cached
  get avgUsage() {
    return this.totalUsage / this.totalCalls;
  }

  @cached
  get totalCost() {
    return sumBy(this.cdrStats, 'totalCost');
  }

  @cached
  get chartOptions() {
    return {
      chart: {
        type: 'column',
      },
      ...withoutTitle,
      xAxis: {
        categories: this.cdrStats.map((s) => this.intl.formatDate(s.date)),
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
    this.cdrStats = yield this.store.query('cdr-stat', {
      filter: prepareQueryParams({ account, createdAtLte, createdAtGte }),
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
