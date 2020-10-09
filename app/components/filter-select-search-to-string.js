import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import strToArray from 'cgrates-web-frontend/utils/str-to-array';

export default Component.extend({
  store: service(),
  searchField: 'customId',
  placeholder: '...',
  multiple: false,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('valueWrapper', strToArray(this.value));
    this.onValueChange(this.key, this.value);
  },

  searchTask: task(function* (term) {
    const response = yield this.store.query(this.searchModel, {
      tpid: this.tpid,
      filter: {
        [this.searchField.underscore()]: term,
      },
    });
    return response.mapBy(this.searchField);
  }).restartable(),

  actions: {
    onChange(value) {
      this.set('valueWrapper', value);
      const newValue = this.multiple ? value.join(',') : value;
      this.onValueChange(this.key, newValue);
    },
  },
});
