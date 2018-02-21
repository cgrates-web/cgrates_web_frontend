import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';
import config from 'cgrates-web-frontend/config/environment';

export default Controller.extend(QueryControllerMixin, {
  queryParams: Object.freeze(['rate', 'supplierName', 'prefix']),
  rate: null,
  supplierName: null,
  prefix: null,

  tariffPlanController: controller('tariff-plan'),
  tariffPlan:           readOnly('tariffPlanController.model'),
  flashMessages:        service(),

  csvExportUrl: `${config.API_HOST}/csv-export?table=raw_supplier_rates`,

  actions: {
    resolve() {
      this.store
          .createRecord('raw-supplier-resolve-job', {tpid: this.get('tariffPlan.id')})
          .save()
          .then(()  => { this.get('flashMessages').success('Resolve job is starting') })
          .catch(() => { this.get('flashMessages').alert('Somethings went wrong') });
    }
  }
});