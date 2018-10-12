import DS from 'ember-data';
import { mapBy, sum } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [
    validator('presence', true),
    validator('ds-error'),
  ],
});
export default DS.Model.extend(Validations, {
  allowNegative:  DS.attr('boolean', {defaultValue: false}),
  disabled:       DS.attr('boolean', {defaultValue: false}),
  balanceMap:     DS.attr({defaultValue: null}),
  unitCounters:   DS.attr({defaultValue: null}),
  actionTriggers: DS.attr({defaultValue: null}),

  balanceMonetaryValues: mapBy('balanceMap.*monetary', 'value'),
  balance:               sum('balanceMonetaryValues')
});
