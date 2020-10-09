import Component from '@ember/component';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { isBlank, isPresent } from '@ember/utils';
import moment from 'moment';

export default Component.extend({
  _onInit: on('didReceiveAttrs', function () {
    if (isPresent(this.value)) {
      this.set('valueWrapper', new Date(this.value));
    } else {
      this.set('valueWrapper', null);
    }
    this.onValueChange(this.key, this.valueWrapper);
  }),

  valueChanged: observer('valueWrapper', function () {
    let formattedDate;
    if (isBlank(this.valueWrapper)) {
      this.set('valueWrapper', null);
      formattedDate = null;
    } else {
      formattedDate = moment(this.valueWrapper).utc().format();
    }

    if (this.value !== formattedDate) {
      this.onValueChange(this.key, formattedDate);
    }
  }),
});
