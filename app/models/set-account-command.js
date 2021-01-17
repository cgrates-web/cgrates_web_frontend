import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  account: validator('presence', true),
});

export default class SetAccountCommand extends Model.extend(Validations) {
  @attr('string') account;
}
