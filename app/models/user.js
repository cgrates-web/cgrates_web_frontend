import DS from 'ember-data';
import { not } from '@ember/object/computed';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', {
      type: 'email',
    }),
  ],
  password: validator('presence', {
    presence: true,
    disabled: not('model.isNew')
  }),
});
export default DS.Model.extend(Validations, {
  email:      DS.attr('string'),
  password:   DS.attr('string'),
  insertedAt: DS.attr('date'),
  updatedAt:  DS.attr('date')
});
