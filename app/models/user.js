import Model, { attr } from '@ember-data/model';
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
    disabled: not('model.isNew'),
  }),
});
export default Model.extend(Validations, {
  email: attr('string'),
  password: attr('string'),
  insertedAt: attr('date'),
  updatedAt: attr('date'),
});
