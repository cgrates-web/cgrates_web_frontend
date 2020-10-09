import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tag: {
      refreshModel: true,
    },
    action: {
      refreshModel: true,
    },
    balanceTag: {
      refreshModel: true,
    },
    balanceType: {
      refreshModel: true,
    },
    directions: {
      refreshModel: true,
    },
    units: {
      refreshModel: true,
    },
    expiryTime: {
      refreshModel: true,
    },
    timingTags: {
      refreshModel: true,
    },
    destinationTags: {
      refreshModel: true,
    },
    ratingSubject: {
      refreshModel: true,
    },
    categories: {
      refreshModel: true,
    },
    sharedGroups: {
      refreshModel: true,
    },
    balanceWeight: {
      refreshModel: true,
    },
    balanceBlocker: {
      refreshModel: true,
    },
    balanceDisabled: {
      refreshModel: true,
    },
    weight: {
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

  filterParams: [
    'tag',
    'action',
    'balanceTag',
    'balanceType',
    'directions',
    'units',
    'expiryTime',
    'timingTags',
    'destinationTags',
    'ratingSubject',
    'categories',
    'sharedGroups',
    'balanceWeight',
    'balanceBlocker',
    'balanceDisabled',
    'weight',
  ],

  modelName: 'tp-action',
});
