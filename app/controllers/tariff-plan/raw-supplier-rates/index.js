import Controller from '@ember/controller';
import QueryControllerMixin from 'cgrates-web-frontend/mixins/query-controller-mixin';

export default Controller.extend(QueryControllerMixin, {
  queryParams: Object.freeze(['rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt', 'page', 'pageSize']),
  rate:         null,
  supplierName: null,
  prefix:       null,
  insertedAtLt: null,
  insertedAtGt: null,

  permittedFilters: Object.freeze([
    'rate', 'supplierName', 'prefix', 'insertedAtGt', 'insertedAtLt'
  ]),

  actions: {
    resolve() {
      this.store
        .createRecord('raw-supplier-resolve-job', {tpid: this.get('tariffPlan.id')})
        .save()
        .then(()  => { this.get('flashMessages').success('Resolve job is starting'); })
        .catch(() => { this.get('flashMessages').danger('Somethings went wrong'); });
    }
  },
});
