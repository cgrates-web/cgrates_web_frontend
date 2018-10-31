import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: ['tenant', 'customId', 'filterIds', 'activationInterval', 'runId', 'attributeIds', 'weight',
    'sortColumn', 'sortOrder', 'page', 'pageSize'],

  tenant:             null,
  customId:           null,
  filterIds:          null,
  activationInterval: null,
  runId:              null,
  attributeIds:       null,
  weight:             null,

  permittedFilters: Object.freeze(['tenant', 'customId', 'filterIds', 'activationInterval',
    'runId', 'attributeIds', 'weight']),
});
