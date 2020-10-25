import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  ratesTag: validator('presence', true),
  destinationsTag: validator('presence', true),
  roundingDecimals: validator('presence', true),
  maxCost: validator('presence', true),
  maxCostStrategy: [validator('presence', true), validator('ds-error')],
  roundingMethod: [validator('presence', true), validator('ds-error')],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  roundingMethod: attr('string'),
  roundingDecimals: attr('number'),
  ratesTag: attr('string'),
  maxCostStrategy: attr('string'),
  maxCost: attr('number'),
  destinationsTag: attr('string'),
  createdAt: attr('date'),
});
