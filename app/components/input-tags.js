import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import SelectComponentMixin from 'cgrates-web-frontend/mixins/select-component-mixin';
import { task } from 'ember-concurrency';

export default Component.extend(SelectComponentMixin, {
  tagName: '',
  store: service(),

  allowAny: false,

  anyIfAllowed: computed('allowAny', function () {
    if (this.allowAny) {
      return ['*any'];
    } else {
      return null;
    }
  }),

  searchTask: task(function* (searchTerm) {
    const items = yield this.store.query(
        this.modelName, { tpid: this.tpid, filter: { tag: searchTerm }, sort: 'tag' }
      );
    const result = items.mapBy('tag').uniq();
    if (this.allowAny) {
      result.push('*any');
    }
    return result;
  }),
});
