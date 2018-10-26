import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant:                { refreshModel: true },
    customId:              { refreshModel: true },
    filterIds:             { refreshModel: true },
    activationInterval:    { refreshModel: true },
    usageTtl:              { refreshModel: true },
    limit:                 { refreshModel: true },
    allocationMessage:     { refreshModel: true },
    blocker:               { refreshModel: true },
    stored:                { refreshModel: true },
    weight:                { refreshModel: true },
    thresholdIds:          { refreshModel: true },
    sortColumn:            { refreshModel: true },
    sortOrder:             { refreshModel: true },
    page:                  { refreshModel: true },
    pageSize:              { refreshModel: true }
  },

  filterParams: ['tenant', 'customId', 'filterIds', 'activationInterval', 'usageTtl', 'limit', 'allocationMessage',
    'blocker', 'stored', 'weight', 'thresholdIds'
  ],

  modelName: 'tp-resource'
});
