import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import Ember from 'ember';

export default Mixin.create({
  _onInit: Ember.on('didReceiveAttrs', function() {
    this.set('valueWrapper', this.get('value'));
    return this.sendAction('onValueChange', this.get('key'), this.get('valueWrapper'));
  }),

  valueChanged: observer('valueWrapper', function() {
    if (isBlank(this.get('valueWrapper'))) { this.set('valueWrapper', null); }
    if (this.get('value') !== this.get('valueWrapper')) { return this.sendAction('onValueChange', this.get('key'), this.get('valueWrapper')); }
  })
});
