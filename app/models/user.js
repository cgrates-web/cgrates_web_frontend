import Model, { attr, belongsTo } from '@ember-data/model';
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

export default class User extends Model.extend(Validations) {
  @attr('string') email;
  @attr('string') password;
  @attr('date') insertedAt;
  @attr('date') updatedAt;

  @belongsTo({ async: false }) tenant;
}
