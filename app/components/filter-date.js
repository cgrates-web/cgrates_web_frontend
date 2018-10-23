import Component from '@ember/component';
import { observer } from '@ember/object'
import { on } from '@ember/object/evented';
import { isBlank, isPresent } from '@ember/utils'
import moment from 'moment';

export default Component.extend({
  _onInit: on('didReceiveAttrs', function() {
    if (isPresent(this.get('value'))) {
      this.set('valueWrapper', new Date(this.get('value')));
    } else {
      this.set('valueWrapper', null);
    }
    this.onValueChange(this.get('key'), this.get('valueWrapper'));
  }),

  valueChanged: observer('valueWrapper', function () {
    let formattedDate;
    if (isBlank(this.get('valueWrapper'))) {
      this.set('valueWrapper', null);
      formattedDate = null;
    } else {
      formattedDate = moment(this.get('valueWrapper')).utc().format();
    }

    if (this.get('value') !== formattedDate) {
      this.onValueChange(this.get('key'), formattedDate);
    }
  }),
});
