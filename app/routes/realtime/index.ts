import QueryRouteBase from '../query-route-base';

export default class RealtimeIndexRoute extends QueryRouteBase {
  queryParams = {
    destination: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  };

  filterParams = Object.freeze(['destination']);

  modelName = 'call';

  _getTtpid() {
    return undefined;
  }
}
