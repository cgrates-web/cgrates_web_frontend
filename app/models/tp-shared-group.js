import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  strategy: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
  ratingSubject: [
    validator('presence', true),
    validator('length', {
      max: 24,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tag: attr('string'),
  account: attr('string'),
  strategy: attr('string'),
  ratingSubject: attr('string'),
  createdAt: attr('date'),
});
