import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  name: [validator('presence', true), validator('ds-error')],
  alias: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64,
    }),
  ],
  description: validator('presence', true),
});
export default Model.extend(Validations, {
  name: attr('string'),
  alias: attr('string'),
  description: attr('string'),
});
