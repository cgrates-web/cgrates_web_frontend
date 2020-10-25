import Model, { attr } from '@ember-data/model';
import { mapBy, sum } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  id: [validator('presence', true), validator('ds-error')],
});
export default Model.extend(Validations, {
  allowNegative: attr('boolean', { defaultValue: false }),
  disabled: attr('boolean', { defaultValue: false }),
  balanceMap: attr({ defaultValue: null }),
  unitCounters: attr({ defaultValue: null }),
  actionTriggers: attr({ defaultValue: null }),

  balanceMonetaryValues: mapBy('balanceMap.*monetary', 'value'),
  balance: sum('balanceMonetaryValues'),
});
