import DS from 'ember-data';
import { mapBy, sum } from '@ember/object/computed';

export default DS.Model.extend({
  allowNegative:  DS.attr('boolean', {defaultValue: false}),
  disabled:       DS.attr('boolean', {defaultValue: false}),
  balanceMap:     DS.attr({defaultValue: null}),
  unitCounters:   DS.attr({defaultValue: null}),
  actionTriggers: DS.attr({defaultValue: null}),

  balanceMonetaryValues: mapBy('balanceMap.*monetary', 'value'),
  balance:               sum('balanceMonetaryValues')
});
