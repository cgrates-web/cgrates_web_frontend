import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(QueryControllerMixin, {
  selectValues: service(),

  queryParams: ['cgrid', 'runId', 'originHost', 'source', 'originId', 'tor', 'direction', 'tenant',
                'category', 'account', 'destination', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  cgrid:       null,
  runId:       null,
  originHost:  null,
  source:      null,
  originId:    null,
  tor:         null,
  direction:   null,
  tenant:      null,
  category:    null,
  account:     null,
  destination: null
}
);
