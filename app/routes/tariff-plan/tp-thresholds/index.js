import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant:                { refreshModel: true },
    customId:              { refreshModel: true },
    filterIds:             { refreshModel: true },
    activationInterval:    { refreshModel: true },
    maxHits:               { refreshModel: true },
    minHits:               { refreshModel: true },
    minSleep:              { refreshModel: true },
    actionIds:             { refreshModel: true },
    blocker:               { refreshModel: true },
    async:                 { refreshModel: true },
    weight:                { refreshModel: true },
    sortColumn:            { refreshModel: true },
    sortOrder:             { refreshModel: true },
    page:                  { refreshModel: true },
    pageSize:              { refreshModel: true }
  },

  filterParams: ['tenant', 'customId', 'filterIds', 'activationInterval', 'maxHits', 'minHits', 'minSleep', 'actionIds',
    'blocker', 'async', 'weight'
  ],

  modelName: 'tp-threshold'
});
