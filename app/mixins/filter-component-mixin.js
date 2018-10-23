import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import Ember from 'ember';

export default Mixin.create({
  onValueChange() { return null; },

  _onInit: Ember.on('didReceiveAttrs', function() {
    this.set('valueWrapper', this.get('value'));
    return this.onValueChange(this.get('key'), this.get('valueWrapper'));
  }),

  valueChanged: observer('valueWrapper', function() {
    if (isBlank(this.get('valueWrapper'))) { this.set('valueWrapper', null); }
    if (this.get('value') !== this.get('valueWrapper')) { return this.onValueChange(this.get('key'), this.get('valueWrapper')); }
  })
});
