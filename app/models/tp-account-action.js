import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  loadid: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64
    }),
  ],
});
export default DS.Model.extend(Validations, {
  tpid:               DS.attr('string'),
  loadid:             DS.attr('string'),
  tenant:             DS.attr('string'),
  account:            DS.attr('string'),
  actionPlanTag:      DS.attr('string'),
  actionTriggersTag:  DS.attr('string'),
  allowNegative:      DS.attr('boolean', {defaultValue: false}),
  disabled:           DS.attr('boolean', {defaultValue: false}),
  createdAt:          DS.attr('date')
});
