import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  account: validator('presence', true),
  balanceType: validator('presence', true),
  value: validator('number', {
    allowString: true,
    integer: true,
    gte: 0,
  }),
});
export default Model.extend(Validations, {
  account: attr('string'),
  balanceType: attr('string'),
  overwrite: attr('boolean'),
  value: attr('number'),
});
