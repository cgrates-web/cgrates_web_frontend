import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  filterType: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 16,
    }),
  ],
  filterFieldName: validator('length', { max: 64 }),
  filterFieldValues: [
    validator('presence', true),
    validator('length', {
      max: 256,
    }),
  ],
  activationInterval: validator('length', { max: 64 }),
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  tenant: attr('string'),
  customId: attr('string'),
  filterType: attr('string'),
  filterFieldName: attr('string'),
  filterFieldValues: attr('string'),
  activationInterval: attr('string'),
  createdAt: attr('date'),
});
