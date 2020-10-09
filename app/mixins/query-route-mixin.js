import Mixin from '@ember/object/mixin';
import { isBlank, isEqual } from '@ember/utils';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';

export default Mixin.create({
  _getFilterQuery(params) {
    return normalizeFilters(params, this.filterParams);
  },

  _getSortQuery(params) {
    if (!isBlank(params.sortColumn)) {
      if (isEqual(params.sortOrder, 'desc')) {
        return `-${params.sortColumn.underscore()}`;
      } else {
        return `${params.sortColumn.underscore()}`;
      }
    }
  },

  _getPaginationQuery(params) {
    return {
      page: params.page,
      'page-size': params.pageSize,
    };
  },

  _getTtpid() {
    return this.modelFor('tariff-plan').get('alias');
  },

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
      meta: results.get('meta'),
    }));
  },

  setupController(controller, { records, meta }) {
    this._super(controller, records);
    if (!this.notInTariffPlan) {
      controller.set('tariffPlanId', this._getTtpid());
    }
    return controller.set('meta', meta);
  },

  actions: {
    refresh() {
      this.refresh();
    },
  },
});
