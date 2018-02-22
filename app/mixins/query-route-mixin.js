import Ember from 'ember'

export default Ember.Mixin.create({
  _getFilterQuery(params) {
    const query = {};
    this.get('filterParams').forEach(function(key) {
      const value = params[key];
      if (!Ember.isBlank(value)) {
        return query[key.underscore()] = value;
      }
    });
    return query;
  },

  _getSortQuery(params) {
    if (!Ember.isBlank(params.sortColumn)) {
      if (Ember.isEqual(params.sortOrder, 'desc')) {
        return `-${params.sortColumn.underscore()}`;
      } else {
        return `${params.sortColumn.underscore()}`;
      }
    }
  },

  _getPaginationQuery(params) {
    return {
      'page':      params.page,
      'page-size': params.pageSize
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
    if (this.get('notInTariffPlan')) {
      fullQuery = {
        filter: filterQuery,
        sort: sortQuery,
        page: paginationQuery
      };
    } else {
      fullQuery = {
        tpid: this._getTtpid(),
        filter: filterQuery,
        sort: sortQuery,
        page: paginationQuery
      };
    }
    return this.store.query(this.get('modelName'), fullQuery).then(results =>
      ({
        records: results,
        meta: results.get('meta')
      }));
  },

  setupController(controller, {records, meta}) {
    this._super(controller, records);
    return controller.set('meta', meta);
  }
});
