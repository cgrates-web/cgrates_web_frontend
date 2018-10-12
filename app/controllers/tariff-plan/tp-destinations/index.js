import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['tag', 'prefix', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tag:    null,
  prefix: null
});
