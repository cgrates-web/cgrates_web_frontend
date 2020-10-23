import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant: { refreshModel: true },
    customId: { refreshModel: true },
    contexts: { refreshModel: true },
    filterIds: { refreshModel: true },
    activationInterval: { refreshModel: true },
    fieldName: { refreshModel: true },
    initial: { refreshModel: true },
    substitute: { refreshModel: true },
    append: { refreshModel: true },
    blocker: { refreshModel: true },
    weight: { refreshModel: true },
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  filterParams: Object.freeze([
    'tenant',
    'customId',
    'contexts',
    'filterIds',
    'activationInterval',
    'fieldName',
    'initial',
    'substitute',
    'append',
    'blocker',
    'weight',
  ]),

  modelName: 'tp-attribute',
});
