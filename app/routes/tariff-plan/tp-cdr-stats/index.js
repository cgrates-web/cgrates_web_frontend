import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  setRefreshModelParams() {
    this.filterParams.forEach((item) => {
      this.set(`queryParams.${item}`, { refreshModel: true });
    });
  },

  beforeModel() {
    this.setRefreshModelParams();
  },

  filterParams: Object.freeze([
    'tag',
    'queueLength',
    'timeWindow',
    'saveInterval',
    'metrics',
    'setupInterval',
    'tors',
    'cdrHosts',
    'cdrSources',
    'reqTypes',
    'directions',
    'tenants',
    'categories',
    'accounts',
    'subjects',
    'destinationIds',
    'pddInterval',
    'usageInterval',
    'suppliers',
    'disconnectCauses',
    'mediationRunids',
    'ratedAccounts',
    'ratedSubjects',
    'costInterval',
    'actionTriggers',
  ]),

  modelName: 'tp-cdr-stat',
});
