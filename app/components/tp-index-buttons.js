import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import normalizeFilters from 'cgrates-web-frontend/utils/normalize-filters';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { task } from 'ember-concurrency';
import { isBlank } from '@ember/utils'

export default Component.extend(FileSaverMixin, {
  flashMessages:        service(),
  ajax:                 service(),

  permittedFilters: null,

  init() {
    this._super(...arguments);
    if (isBlank(this.get('permittedFilters')))
      this.set('permittedFilters', []);
  },

  csvImportRouteName: computed('model.modelName',function () {
    return `tariff-plan.${this.get('model.modelName')}s.csv-import`;
  }),

  newRouteName: computed('model',function () {
    return `tariff-plan.${this.get('model.modelName')}s.new`;
  }),

  tagName: '',

  exportToCsv: task(function * () {
    try {
      const filter = normalizeFilters(this.get('controller'), this.get('permittedFilters'));
      const response = yield this.get('ajax').request(`/api/${this.get('model.modelName')}s/export-to-csv`, {
        dataType: 'blob',
        data: {
          tpid: this.get('tariffPlanId'),
          filter: filter
        }
      });
      this.saveFileAs('export.csv', response, 'application/csv');
    } catch (err) {
      this.get('flashMessages').danger('Somethings went wrong');
    }
  }),

  deleteAll: task(function * () {
    try {
      const filter = normalizeFilters(this.get('controller'), this.get('permittedFilters'));
      yield this.get('ajax').request(`/api/${this.get('model.modelName')}s/delete-all`, {
        method: 'POST',
        data: {
          tpid: this.get('tariffPlanId'),
          filter: filter
        }
      });
      this.get('flashMessages').success('Records have been deleted');
    } catch (err) {
      this.get('flashMessages').danger('Somethings went wrong');
    }
  }),

  actions: {
    refresh() {
      this.sendAction('refresh');
    }
  }
});
