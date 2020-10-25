import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';
const Validations = buildValidations({
  loadid: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  tenant: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
  account: [
    validator('presence', true),
    validator('length', {
      max: 64,
    }),
  ],
});
export default Model.extend(Validations, {
  tpid: attr('string'),
  loadid: attr('string'),
  tenant: attr('string'),
  account: attr('string'),
  actionPlanTag: attr('string'),
  actionTriggersTag: attr('string'),
  allowNegative: attr('boolean', { defaultValue: false }),
  disabled: attr('boolean', { defaultValue: false }),
  createdAt: attr('date'),
});
