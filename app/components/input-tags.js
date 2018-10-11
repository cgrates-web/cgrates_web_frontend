import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import SelectComponentMixin from 'cgrates-web-frontend/mixins/select-component-mixin';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(SelectComponentMixin, {
  tagName: '',
  store: service(),

  allowAny: false,

  anyIfAllowed: computed('allowAny', function() {
    if (this.get('allowAny')) { return ['*any']; } else { return null; }
  }),

  searchTask: task(function*(searchTerm) {
    yield timeout(300);
    return this.get('store').query(
      this.get('modelName'), {tpid: this.get('tpid'), filter: {tag: searchTerm}, sort: 'tag'}
    ).then(items => {
      const result = items.mapBy('tag').uniq();
      if (this.get('allowAny')) { result.push('*any'); }
      return result;
  });
  })
}
);
