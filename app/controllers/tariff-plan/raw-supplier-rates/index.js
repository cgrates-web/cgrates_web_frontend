import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import config from 'cgrates-web-frontend/config/environment';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';

export default Controller.extend(QueryControllerMixin, {
  queryParams: Object.freeze(['rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt', 'page', 'pageSize']),
  rate: null,
  supplierName: null,
  prefix: null,
  insertedAtLt: null,
  insertedAtGt: null,

  tariffPlanController: controller('tariff-plan'),
  tariffPlan:           readOnly('tariffPlanController.model'),
  flashMessages:        service(),
  ajax:                 service(),

  csvExportUrl: `${config.API_HOST}/csv-export?table=raw_supplier_rates`,

  actions: {
    resolve() {
      this.store
          .createRecord('raw-supplier-resolve-job', {tpid: this.get('tariffPlan.id')})
          .save()
          .then(()  => { this.get('flashMessages').success('Resolve job is starting') })
          .catch(() => { this.get('flashMessages').alert('Somethings went wrong') });
    },

    deleteAll() {
      const permittedFilters = ['rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt'];
      const filter = normalizeFilters(this, permittedFilters);
      this.get('ajax').request('/api/raw-supplier-rates/delete-all', {
        method: 'POST',
        data: {
          tpid: this.get('tariffPlan.id'),
          filter: filter
        }
      }).then(()  => { this.get('flashMessages').success('Records have been deleted') })
        .catch(() => { this.get('flashMessages').alert('Somethings went wrong') });
    }
  }
});