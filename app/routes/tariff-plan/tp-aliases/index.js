import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant:               { refreshModel: true },
    direction:            { refreshModel: true },
    account:              { refreshModel: true },
    destinationId:        { refreshModel: true },
    category:             { refreshModel: true },
    subject:              { refreshModel: true },
    context:              { refreshModel: true },
    targetParam:          { refreshModel: true },
    original:             { refreshModel: true },
    alias:                { refreshModel: true },
    weight:               { refreshModel: true },
    sortColumn:           { refreshModel: true },
    sortOrder:            { refreshModel: true },
    page:                 { refreshModel: true },
    pageSize:             { refreshModel: true }
  },

  filterParams: ['tenant', 'direction', 'account', 'destinationId', 'category', 'subject', 'context',
    'targetParam', 'original', 'alias', 'weight'],

  modelName: 'tp-alias',
});
