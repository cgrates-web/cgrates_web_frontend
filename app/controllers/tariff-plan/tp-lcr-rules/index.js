import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['direction', 'tenant', 'category', 'account', 'subject', 'destinationTag', 'rpCategory', 'strategy',
    'sortColumn', 'sortOrder', 'page', 'pageSize'],

  direction:      null,
  tenant:         null,
  category:       null,
  account:        null,
  subject:        null,
  destinationTag: null,
  rpCategory:     null,
  strategy:       null
}
);
