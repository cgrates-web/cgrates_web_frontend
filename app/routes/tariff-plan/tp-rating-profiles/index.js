import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    loadid: {
      refreshModel: true,
    },
    direction: {
      refreshModel: true,
    },
    tenant: {
      refreshModel: true,
    },
    category: {
      refreshModel: true,
    },
    subject: {
      refreshModel: true,
    },
    fallbackSubjects: {
      refreshModel: true,
    },
    activationTime: {
      refreshModel: true,
    },
    cdrStatQueueIds: {
      refreshModel: true,
    },
    ratingPlanTag: {
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

  filterParams: [
    'loadid',
    'direction',
    'tenant',
    'category',
    'subject',
    'fallbackSubjects',
    'activationTime',
    'cdrStatQueueIds',
    'ratingPlanTag',
  ],

  modelName: 'tp-rating-profile',
});
