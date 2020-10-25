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
  rateUnit: [validator('presence', true), validator('ds-error')],
  rateIncrement: [validator('presence', true), validator('ds-error')],
  groupIntervalStart: [validator('presence', true), validator('ds-error')],
  rate: validator('presence', true),
  connectFee: validator('presence', true),
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  rateUnit: attr('string'),
  rateIncrement: attr('string'),
  rate: attr('number'),
  groupIntervalStart: attr('string'),
  connectFee: attr('number'),
  createdAt: attr('date'),
});
