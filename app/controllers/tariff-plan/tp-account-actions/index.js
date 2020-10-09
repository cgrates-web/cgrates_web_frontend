import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),
  queryParams: [
    'loadid',
    'tenant',
    'account',
    'actionPlanTag',
    'actionTriggersTag',
    'allowNegative',
    'disabled',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  loadid: null,
  tenant: null,
  account: null,
  actionPlanTag: null,
  actionTriggersTag: null,
  allowNegative: null,
  disabled: null,

  permittedFilters: Object.freeze([
    'loadid',
    'tenant',
    'account',
    'actionPlanTag',
    'actionTriggersTag',
    'allowNegative',
    'disabled',
  ]),
});
