import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['tag', 'roundingMethod', 'roundingDecimals', 'ratesTag', 'maxCostStrategy',
    'maxCost', 'destinationsTag', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tag:              null,
  roundingMethod:   null,
  roundingDecimals: null,
  ratesTag:         null,
  maxCostStrategy:  null,
  maxCost:          null,
  destinationsTag:  null,

  permittedFilters: Object.freeze([
    'tag', 'roundingMethod', 'roundingDecimals', 'ratesTag', 'maxCostStrategy',
    'maxCost', 'destinationsTag'
  ]),
});
