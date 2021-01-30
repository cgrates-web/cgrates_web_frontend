import BaseRoute from '../../query-route-base';

export default class NewTpRouteRoute extends BaseRoute {
  queryParams = {
    customId: {
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
  };

  filterParams = Object.freeze(['customId']);

  modelName = 'tp-route';
}
