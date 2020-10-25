import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: [
    'tag',
    'uniqueId',
    'thresholdType',
    'thresholdValue',
    'recurrent',
    'minSleep',
    'expiryTime',
    'activationTime',
    'balanceTag',
    'balanceType',
    'minQueuedItems',
    'actionsTag',
    'weight',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  tag: null,
  uniqueId: null,
  thresholdType: null,
  thresholdValue: null,
  recurrent: null,
  minSleep: null,
  expiryTime: null,
  activationTime: null,
  balanceTag: null,
  balanceType: null,
  minQueuedItems: null,
  actionsTag: null,
  weight: null,

  permittedFilters: Object.freeze([
    'tag',
    'uniqueId',
    'thresholdType',
    'thresholdValue',
    'recurrent',
    'minSleep',
    'expiryTime',
    'activationTime',
    'balanceTag',
    'balanceType',
    'minQueuedItems',
    'actionsTag',
    'weight',
  ]),
});
