import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant: {
      refreshModel: true
    },
    customId: {
      refreshModel: true
    },
    filterIds: {
      refreshModel: true
    },
    sorting: {
      refreshModel: true
    },
    activationInterval: {
      refreshModel: true
    },
    supplierId: {
      refreshModel: true
    },
    supplierFilterIds: {
      refreshModel: true
    },
    supplierAccountIds: {
      refreshModel: true
    },
    supplierRatingplanIds: {
      refreshModel: true
    },
    supplierResourceIds: {
      refreshModel: true
    },
    supplierStatIds: {
      refreshModel: true
    },
    supplierWeight: {
      refreshModel: true
    },
    blocker: {
      refreshModel: true
    },
    weight: {
      refreshModel: true
    },
    sortColumn: {
      refreshModel: true
    },
    sortOrder: {
      refreshModel: true
    },
    sortingParameters: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    pageSize: {
      refreshModel: true
    }
  },

  filterParams: Object.freeze([
    'tenant', 'customId', 'filterIds', 'sorting', 'activationInterval', 'supplierId', 'supplierFilterIds',
    'supplierAccountIds', 'supplierRatingplanIds', 'supplierResourceIds', 'supplierStatIds', 'supplierWeight',
    'blocker', 'weight', 'sortingParameters'
  ]),
  modelName: 'tp-supplier'
}
);
