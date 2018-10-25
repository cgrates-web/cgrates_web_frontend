import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  ratesTag:                 validator('presence', true),
  destinationsTag:          validator('presence', true),
  roundingDecimals:         validator('presence', true),
  maxCost:                  validator('presence', true),
  maxCostStrategy:        [validator('presence', true), validator('ds-error')],
  roundingMethod:         [validator('presence', true), validator('ds-error')],
});
export default DS.Model.extend(Validations, {
  tpid:             DS.attr('string'),
  tag:              DS.attr('string'),
  roundingMethod:   DS.attr('string'),
  roundingDecimals: DS.attr('number'),
  ratesTag:         DS.attr('string'),
  maxCostStrategy:  DS.attr('string'),
  maxCost:          DS.attr('number'),
  destinationsTag:  DS.attr('string'),
  createdAt:        DS.attr('date')
});
