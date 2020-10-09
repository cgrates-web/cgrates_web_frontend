import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: [
    'tag',
    'account',
    'strategy',
    'ratingSubject',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  tag: null,
  account: null,
  strategy: null,
  ratingSubject: null,

  permittedFilters: Object.freeze([
    'tag',
    'account',
    'strategy',
    'ratingSubject',
  ]),
});
