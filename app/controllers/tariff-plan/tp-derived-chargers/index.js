import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: [
    'loadid',
    'direction',
    'tenant',
    'category',
    'account',
    'subject',
    'destinationIds',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  loadid: null,
  direction: null,
  tenant: null,
  category: null,
  account: null,
  subject: null,
  destinationIds: null,

  permittedFilters: Object.freeze([
    'loadid',
    'direction',
    'tenant',
    'category',
    'account',
    'subject',
    'destinationIds',
  ]),
});
