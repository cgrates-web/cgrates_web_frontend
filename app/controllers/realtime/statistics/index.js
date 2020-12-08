import Controller from '@ember/controller';
import QueryParams from 'ember-parachute';
import { task } from 'ember-concurrency';
import { pipe, filter, complement, isEmpty } from 'ramda';
import { renameKeysWith } from 'ramda-adjunct';
import { underscore } from '@ember/string';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const statsQueryParams = new QueryParams({
  group: {
    refresh: true,
  }
});

const prepareQueryParams = pipe(
  filter(complement(isEmpty)),
  renameKeysWith(underscore)
);

export default class StatisticsIndex extends Controller.extend(statsQueryParams.Mixin) {
  @tracked
  group = 'daily';

  @(task(function* ({ ratingPlanTag, createdAtLte, createdAtGte, group }) {
    this.cdrStats = yield this.store.query('cdr-stat', {
      filter: prepareQueryParams({ ratingPlanTag, createdAtLte, createdAtGte }),
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
  setFilters({ ratingPlanTag, createdAtLte, createdAtGte, group }) {
    // this.ratingPlanTag = ratingPlanTag;
    // this.createdAtGte = createdAtGte;
    // this.createdAtLte = createdAtLte;
    this.group = group;
  }
}
