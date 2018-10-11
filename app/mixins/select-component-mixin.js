import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  id: computed('elementId', function() {
    return `${this.get('elementId')}-select`;
  })
});
