import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['tag', 'actionsTag', 'timingTag', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tag:        null,
  actionsTag: null,
  timingTag:  null,
  weight:     null
}
);
