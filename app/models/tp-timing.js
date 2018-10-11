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
  time: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  years:        validator('presence', true),
  months:       validator('presence', true),
  monthDays:    validator('presence', true),
  weekDays:     validator('presence', true),
});
export default DS.Model.extend(Validations, {
  tpid:      DS.attr('string'),
  tag:       DS.attr('string'),
  years:     DS.attr('string'),
  months:    DS.attr('string'),
  monthDays: DS.attr('string'),
  weekDays:  DS.attr('string'),
  time:      DS.attr('string'),
  createdAt: DS.attr('date')
});
