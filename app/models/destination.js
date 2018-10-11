import DS from 'ember-data';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [
    validator('presence', true),
    validator('ds-error'),
  ],
  prefixesString: validator('presence', true),

});
export default DS.Model.extend(Validations, {
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
