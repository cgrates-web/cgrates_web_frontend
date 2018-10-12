import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  name: [
    validator('presence', true),
    validator('ds-error'),
  ],
  alias: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 64
    }),
  ],
  description: validator('presence', true),
});
export default DS.Model.extend(Validations, {
  name:           DS.attr('string'),
  alias:          DS.attr('string'),
  description:    DS.attr('string')
});
