import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { isPresent } from '@ember/utils';

export default Component.extend({
  tagName:      '',
  store:        service(),
  searchField: 'customId',
  placeholder: 'Select ids...',

  strToObjectsArray(str) {
    if (isPresent(str)) {
      return str.split(',').map(item => ({ [this.searchField]: item }));
    }
    return [];
  },

  arrayObjectsToStr(arr) {
    return arr.map(item => item[this.searchField]).join(',');
  },

  removeRepeatElements(arr) {
    const onlyUniq = arr => (value, index) => arr.indexOf(value[this.searchField]) === index;
    return arr.filter(onlyUniq(arr.map(item => item[this.searchField])));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('valueWrapper', this.strToObjectsArray(this.value));
  },

  searchTask: task(function * (term) {
    yield timeout(300);
    return this.get('store').query(this.searchModel, {
      tpid: this.tpid,
      filter: {
        [this.searchField.underscore()]: term,
      }
    });
  }).restartable(),

  actions: {
    onChange(values) {
      const arr = this.removeRepeatElements(values);
      this.set('valueWrapper', arr);
      this.set('value', this.arrayObjectsToStr(arr));
    }
  },
});
