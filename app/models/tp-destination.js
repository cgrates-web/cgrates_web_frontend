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
  prefix: [
    validator('presence', true),
    validator('length', {
      max: 24
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:      DS.attr('string'),
  tag:       DS.attr('string'),
  prefix:    DS.attr('string'),
  createdAt: DS.attr('date'),
});
