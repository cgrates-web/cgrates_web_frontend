import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    loadid: { refreshModel: true },
    tenant: { refreshModel: true },
    account: { refreshModel: true },
    actionPlanTag: { refreshModel: true },
    actionTriggersTag: { refreshModel: true },
    allowNegative: { refreshModel: true },
    disabled: { refreshModel: true },
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  filterParams: Object.freeze([
    'loadid',
    'tenant',
    'account',
    'actionPlanTag',
    'actionTriggersTag',
    'allowNegative',
    'disabled',
  ]),

  modelName: 'tp-account-action',
});
