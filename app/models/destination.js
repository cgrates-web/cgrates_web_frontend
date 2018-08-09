import DS from 'ember-data';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default DS.Model.extend({
  prefixes: DS.attr(),

  prefixesString: computed('prefixes.length', {
    get() {
      if (isBlank(this.get('prefixes'))) { return ''; }
      return this.get('prefixes').join(', ');
    },
    set(key, value) {
      return this.set('prefixes', value.split(/\s*,\s*/));
    }
  }
  )
});
