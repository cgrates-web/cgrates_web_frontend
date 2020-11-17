import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: [
    'loadid',
    'tenant',
    'category',
    'subject',
    'fallbackSubjects',
    'activationTime',
    'ratingPlanTag',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  loadid: null,
  tenant: null,
  category: null,
  subject: null,
  fallbackSubjects: null,
  activationTime: null,
  ratingPlanTag: null,

  permittedFilters: Object.freeze([
    'loadid',
    'tenant',
    'category',
    'subject',
    'fallbackSubjects',
    'activationTime',
    'ratingPlanTag',
  ]),
});
