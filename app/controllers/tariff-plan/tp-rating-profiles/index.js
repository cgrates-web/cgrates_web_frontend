import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['loadid', 'direction', 'tenant', 'category', 'subject', 'fallbackSubjects', 'activationTime',
    'cdrStatQueueIds', 'ratingPlanTag', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  loadid:           null,
  direction:        null,
  tenant:           null,
  category:         null,
  subject:          null,
  fallbackSubjects: null,
  activationTime:   null,
  cdrStatQueueIds:  null,
  ratingPlanTag:    null,

  permittedFilters: Object.freeze([
    'loadid', 'direction', 'tenant', 'category', 'subject', 'fallbackSubjects', 'activationTime',
    'cdrStatQueueIds', 'ratingPlanTag'
  ]),
});
