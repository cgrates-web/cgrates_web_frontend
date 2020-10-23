import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tag: {
      refreshModel: true,
    },
    roundingMethod: {
      refreshModel: true,
    },
    roundingDecimals: {
      refreshModel: true,
    },
    ratesTag: {
      refreshModel: true,
    },
    maxCostStrategy: {
      refreshModel: true,
    },
    maxCost: {
      refreshModel: true,
    },
    destinationsTag: {
      refreshModel: true,
    },
    sortColumn: {
      refreshModel: true,
    },
    sortOrder: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  },

  filterParams: Object.freeze([
    'tag',
    'roundingMethod',
    'roundingDecimals',
    'ratesTag',
    'maxCostStrategy',
    'maxCost',
    'destinationsTag',
  ]),

  modelName: 'tp-destination-rate',
});
