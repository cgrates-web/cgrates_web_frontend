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
  time: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  years: validator('presence', true),
  months: validator('presence', true),
  monthDays: validator('presence', true),
  weekDays: validator('presence', true),
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  years: attr('string'),
  months: attr('string'),
  monthDays: attr('string'),
  weekDays: attr('string'),
  time: attr('string'),
  createdAt: attr('date'),
});
