import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tag: {
      refreshModel: true,
    },
    actionsTag: {
      refreshModel: true,
    },
    timingTag: {
      refreshModel: true,
    },
    weight: {
      refreshModel: true,
    },
    sortColumn: {
      refreshModel: true,
    },
    sortOrder: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  },

  filterParams: ['tag', 'actionsTag', 'timingTag', 'weight'],

  modelName: 'tp-action-plan',
});
