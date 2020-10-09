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
  prefix: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  prefix: attr('string'),
  createdAt: attr('date'),
});
