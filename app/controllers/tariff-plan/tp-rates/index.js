import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['tag', 'rateUnit', 'rateIncrement', 'rate', 'groupIntervalStart',
    'connectFee', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tag:                null,
  rateUnit:           null,
  rateIncrement:      null,
  rate:               null,
  groupIntervalStart: null,
  connectFee:         null,

  permittedFilters: Object.freeze([
    'tag', 'rateUnit', 'rateIncrement', 'rate', 'groupIntervalStart', 'connectFee'
  ]),
});
