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
  actionsTag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  timingTag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  weight: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  actionsTag: attr('string'),
  timingTag: attr('string'),
  weight: attr('number'),
  createdAt: attr('date'),
});
