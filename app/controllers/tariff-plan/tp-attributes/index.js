import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: [
    'tenant',
    'customId',
    'contexts',
    'filterIds',
    'activationInterval',
    'blocker',
    'weight',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  tenant: null,
  customId: null,
  contexts: null,
  filterIds: null,
  activationInterval: null,
  blocker: null,
  weight: null,

  permittedFilters: Object.freeze([
    'tenant',
    'customId',
    'contexts',
    'filterIds',
    'activationInterval',
    'blocker',
    'weight',
  ]),
});
