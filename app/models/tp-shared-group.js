import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tag: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  strategy: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
  ratingSubject: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:              DS.attr('string'),
  tag:               DS.attr('string'),
  account:           DS.attr('string'),
  strategy:          DS.attr('string'),
  ratingSubject:     DS.attr('string'),
  createdAt:         DS.attr('date'),
});
