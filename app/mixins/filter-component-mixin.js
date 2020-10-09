import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import { on } from '@ember/object/evented';

export default Mixin.create({
  onValueChange() {
    return null;
  },

  _onInit: on('didReceiveAttrs', function () {
    this.set('valueWrapper', this.value);
    return this.onValueChange(this.key, this.valueWrapper);
  }),

  valueChanged: observer('valueWrapper', function () {
    if (isBlank(this.valueWrapper)) {
      this.set('valueWrapper', null);
    }
    if (this.value !== this.valueWrapper) {
      return this.onValueChange(this.key, this.valueWrapper);
    }
  }),
});
