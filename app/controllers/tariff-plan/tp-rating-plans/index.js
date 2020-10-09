import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: [
    'tag',
    'destratesTag',
    'timingTag',
    'weight',
    'sortColumn',
    'sortOrder',
    'page',
    'pageSize',
  ],

  tag: null,
  destratesTag: null,
  timingTag: null,
  weight: null,

  permittedFilters: Object.freeze([
    'tag',
    'destratesTag',
    'timingTag',
    'weight',
  ]),
});
