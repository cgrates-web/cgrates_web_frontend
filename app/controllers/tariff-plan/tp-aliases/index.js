import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['tenant', 'direction', 'account', 'destinationId', 'category', 'subject', 'context',
    'targetParam', 'original', 'alias', 'weight', 'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tenant:             null,
  direction:          null,
  account:            null,
  destinationId:      null,
  category:           null,
  subject:            null,
  context:            null,
  targetParam:        null,
  original:           null,
  alias:              null,
  weight:             null,

  permittedFilters: Object.freeze(['tenant', 'direction', 'account', 'destinationId', 'category', 'subject', 'context',
    'targetParam', 'original', 'alias', 'weight']),
});
