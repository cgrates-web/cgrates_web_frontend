import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { action, set, computed } from '@ember/object';
import strToArray from 'cgrates-web-frontend/utils/str-to-array';
import { tracked } from '@glimmer/tracking';

export default class FilterSelectSearchToStringComponent extends Component{
  @service
  store;

  @tracked
  searchField = 'customId';

  @tracked
  placeholder = '...';

  @tracked
  multiple = false;

  @computed('multiple', 'value')
  get selected() {
    return this.multiple ? strToArray(this.value) : this.value;
  }

  @task(
    function* (term) {
      const response = yield this.store.query(this.searchModel, {
        tpid: this.tpid,
        filter: {
          [this.searchField.underscore()]: term,
        },
      });
      return response.mapBy(this.searchField);
    }
  ).restartable()
  searchTask;

  @action
  onChange(value) {
    const newValue = this.multiple ? value.join(',') : value;
    set(this, 'value', newValue);
  };
}
