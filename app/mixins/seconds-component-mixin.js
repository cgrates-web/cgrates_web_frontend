import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Mixin.create({
  valueNumber: computed('valueWrapper', {
      get() {
        if (isBlank(this.get('valueWrapper'))) { return null; }
        return this.get('valueWrapper').replace(/s$/, '');
      },
      set(key, value) {
        this.set('valueWrapper', `${value}s`);
        return value;
      }
    }
  )
});
