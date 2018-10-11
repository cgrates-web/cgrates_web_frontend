import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  customId: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  filterType: [
    validator('presence', true),
    validator('ds-error'),
    validator('length', {
      max: 16
    }),
  ],
  filterFieldName: validator('length', { max: 64 }),
  filterFieldValues: [
    validator('presence', true),
    validator('length', {
      max: 256
    }),
  ],
  activationInterval: validator('length', { max: 64 }),
});
export default DS.Model.extend(Validations, {
  tpid:               DS.attr('string'),
  tenant:             DS.attr('string'),
  customId:           DS.attr('string'),
  filterType:         DS.attr('string'),
  filterFieldName:    DS.attr('string'),
  filterFieldValues:  DS.attr('string'),
  activationInterval: DS.attr('string'),
  createdAt:          DS.attr('date')
});
