import Model, { attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [validator('presence', true), validator('ds-error')],
  prefixesString: validator('presence', true),
});
export default Model.extend(Validations, {
  prefixes: attr(),

  prefixesString: computed('prefixes.length', {
    get() {
      if (isBlank(this.prefixes)) {
        return '';
      }
      return this.prefixes.join(', ');
    },
    set(key, value) {
      return this.set('prefixes', value.split(/\s*,\s*/));
    },
  }),
});
