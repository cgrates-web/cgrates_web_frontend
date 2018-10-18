import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Controller.extend(QueryControllerMixin, FileSaverMixin, {
  queryParams: Object.freeze(['rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt', 'page', 'pageSize']),
  rate:         null,
  supplierName: null,
  prefix:       null,
  insertedAtLt: null,
  insertedAtGt: null,

  tariffPlanController: controller('tariff-plan'),
  tariffPlan:           readOnly('tariffPlanController.model'),
  flashMessages:        service(),
  ajax:                 service(),

  actions: {
    exportToCsv() {
      const permittedFilters = ['rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt'];
      const filter = normalizeFilters(this, permittedFilters);
      this.get('ajax').request('/api/raw-supplier-rates/export-to-csv', {
        dataType: 'blob',
        data: {
          tpid: this.get('tariffPlan.id'),
          filter: filter
        }
      }).then((content) => {
          this.saveFileAs('export.csv', content, 'application/csv');
        })
        .catch(() => this.get('flashMessages').danger('Somethings went wrong'));
    },
    resolve() {
      this.store
          .createRecord('raw-supplier-resolve-job', {tpid: this.get('tariffPlan.id')})
          .save()
          .then(()  => { this.get('flashMessages').success('Resolve job is starting') })
          .catch(() => { this.get('flashMessages').danger('Somethings went wrong') });
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
        .catch(() => { this.get('flashMessages').danger('Somethings went wrong') });
    }
  }
});
