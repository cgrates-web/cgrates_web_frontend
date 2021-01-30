import Route from '@ember/routing/route';
import { isBlank, isEqual } from '@ember/utils';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';
import { set, action } from '@ember/object';

export default class QueryRouteBase extends Route {
  _getFilterQuery(params) {
    return normalizeFilters(params, this.filterParams);
  }

  _getSortQuery(params) {
    if (!isBlank(params.sortColumn)) {
      if (isEqual(params.sortOrder, 'desc')) {
        return `-${params.sortColumn.underscore()}`;
      } else {
        return `${params.sortColumn.underscore()}`;
      }
    }
  }

  _getPaginationQuery(params) {
    return {
      page: params.page,
      'page-size': params.pageSize,
    };
  }

  _getTtpid() {
    return this.modelFor('tariff-plan').alias;
  }

  model(params) {
    let fullQuery;
    const filterQuery = this._getFilterQuery(params);
    const sortQuery = this._getSortQuery(params);
    const paginationQuery = this._getPaginationQuery(params);
    if (this.notInTariffPlan) {
      fullQuery = {
        filter: filterQuery,
        sort: sortQuery,
        page: paginationQuery,
      };
    } else {
      fullQuery = {
        tpid: this._getTtpid(),
        filter: filterQuery,
        sort: sortQuery,
        page: paginationQuery,
      };
    }
    return this.store.query(this.modelName, fullQuery).then((results) => ({
      records: results,
      meta: results.meta,
    }));
  }

  setupController(controller, { records, meta }) {
    set(controller, 'model', records);
    if (!this.notInTariffPlan) {
      set(controller, 'tariffPlanId', this._getTtpid());
    }
    return set(controller, 'meta', meta);
  }

  @action
  refreshCurrentRoute() {
    this.refresh();
  }
}
