import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),
  otherFiltersCollapsed: true,
  queryParams: [
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
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  initEmptyDefaultParams() {
    this.permittedFilters.forEach((item) => {
      if (isBlank(this.get(`${item}`))) this.set(item, null);
    });
  },

  init() {
    this._super(...arguments);
    this.initEmptyDefaultParams();
  },

  permittedFilters: Object.freeze([
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
});
