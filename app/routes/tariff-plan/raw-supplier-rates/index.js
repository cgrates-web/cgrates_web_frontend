import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    rate:          { refreshModel: true },
    prefix:        { refreshModel: true },
    supplierName:  { refreshModel: true },
    page:          { refreshModel: true },
    perPage:       { refreshModel: true },
    sortColumn:    { refreshModel: true },
    sortOrder:     { refreshModel: true }
  },

  filterParams: Object.freeze(['rate', 'prefix', 'supplierName']),
  modelName: 'raw-supplier-rate',

  actions: {
    refresh() {
      this.refresh();
    }
  }
});