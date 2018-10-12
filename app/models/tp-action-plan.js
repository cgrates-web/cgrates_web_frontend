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
  actionsTag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  timingTag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:       DS.attr('string'),
  tag:        DS.attr('string'),
  actionsTag: DS.attr('string'),
  timingTag:  DS.attr('string'),
  weight:     DS.attr('number'),
  createdAt:  DS.attr('date')
});
