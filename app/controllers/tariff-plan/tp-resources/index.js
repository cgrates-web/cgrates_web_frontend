import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: [
    'tenant',
    'customId',
    'filterIds',
    'activationInterval',
    'usageTtl',
    'limit',
    'allocationMessage',
    'blocker',
    'stored',
    'weight',
    'thresholdIds',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  tenant: null,
  customId: null,
  filterIds: null,
  activationInterval: null,
  usageTtl: null,
  limit: null,
  allocationMessage: null,
  blocker: null,
  stored: null,
  weight: null,
  thresholdIds: null,

  permittedFilters: Object.freeze([
    'tenant',
    'customId',
    'filterIds',
    'activationInterval',
    'usageTtl',
    'limit',
    'allocationMessage',
    'blocker',
    'stored',
    'weight',
    'thresholdIds',
  ]),
});
