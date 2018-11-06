import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant:                 { refreshModel: true },
    tag:                    { refreshModel: true },
    uniqueId:               { refreshModel: true },
    thresholdType:          { refreshModel: true },
    thresholdValue:         { refreshModel: true },
    recurrent:              { refreshModel: true },
    minSleep:               { refreshModel: true },
    expiryTime:             { refreshModel: true },
    activationTime:         { refreshModel: true },
    balanceTag:             { refreshModel: true },
    balanceType:            { refreshModel: true },
    minQueuedItems:         { refreshModel: true },
    actionsTag:             { refreshModel: true },
    weight:                 { refreshModel: true },
    sortColumn:             { refreshModel: true },
    sortOrder:              { refreshModel: true },
    page:                   { refreshModel: true },
    pageSize:               { refreshModel: true }
  },

  filterParams: ['tag', 'uniqueId', 'thresholdType', 'thresholdValue', 'recurrent', 'minSleep', 'expiryTime',
    'activationTime', 'balanceTag', 'balanceType', 'minQueuedItems', 'actionsTag', 'weight'
  ],

  modelName: 'tp-action-trigger'
});
