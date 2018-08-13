import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tag: {
      refreshModel: true
    },
    rateUnit: {
      refreshModel: true
    },
    rateIncrement: {
      refreshModel: true
    },
    rate: {
      refreshModel: true
    },
    groupIntervalStart: {
      refreshModel: true
    },
    connectFee: {
      refreshModel: true
    },
    sortColumn: {
      refreshModel: true
    },
    sortOrder: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    pageSize: {
      refreshModel: true
    }
  },

  filterParams: ['tag', 'rateUnit', 'rateIncrement', 'rate', 'groupIntervalStart', 'connectFee'],

  modelName: 'tp-rate'
}
);
